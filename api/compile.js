import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import template1 from '../src/lib/template1.js';

// SwiftLaTeX expects a global Worker (browser) – provide the Node equivalent.
if (typeof globalThis.Worker === 'undefined') globalThis.Worker = Worker;
if (typeof globalThis.self === 'undefined') globalThis.self = globalThis;
if (typeof globalThis.window === 'undefined') globalThis.window = globalThis;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let PdfTeXEngine;
let pdftex;
let engineLoaded = false;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (!PdfTeXEngine) {
      // Lazy import so globals are patched before loading swiftlatex.
      ({ PdfTeXEngine } = await import('swiftlatex'));
      pdftex = new PdfTeXEngine();
      pdftex.workerPath = path.join(__dirname, '../node_modules/swiftlatex/dist/swiftlatexpdftex.js');
    }

    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!engineLoaded) {
      await pdftex.loadEngine();
      await pdftex.makeMemFSFolder('fonts/');
      engineLoaded = true;
    }

    const texDoc = template1(data);
    await pdftex.writeMemFSFile('main.tex', texDoc);
    await pdftex.setEngineMainFile('main.tex');

    const { pdf } = await pdftex.compileLaTeX();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdf));
  } catch (error) {
    console.error('Compile failed', error);
    res.status(500).json({ error: 'Compile failed' });
  }
}

