import { PdfTeXEngine } from 'swiftlatex';
import template1 from '../src/lib/template1.js';

const pdftex = new PdfTeXEngine();
let engineLoaded = false;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
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

