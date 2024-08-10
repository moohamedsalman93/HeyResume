import { PdfTeXEngine } from 'swiftlatex';

const pdftex = new PdfTeXEngine();
let engineLoaded = false;

export default async function latex(texDoc, opts) {
  if (!engineLoaded) {
    await Promise.all([
      pdftex.loadEngine(),
      // xetex.loadEngine(),
      // dvipdfmx.loadEngine()
    ]);
    engineLoaded = true;

    await pdftex.makeMemFSFolder('fonts/');
    // await xetex.makeMemFSFolder('fonts/');
    // await dvipdfmx.makeMemFSFolder('fonts/');
  }

  const fonts = await resolveAssets(opts.fonts || []);
  const inputs = await resolveAssets(opts.inputs || []);

  for (const [name, content] of fonts) {
    await pdftex.writeMemFSFile(`fonts/${name}`, content);
  }

  for (const [name, content] of inputs) {
    await pdftex.writeMemFSFile(name, content);
  }

  await pdftex.writeMemFSFile('main.tex', texDoc);
  await pdftex.setEngineMainFile('main.tex');
  const { pdf } = await pdftex.compileLaTeX();

  return URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));

}

async function resolveAssets(urls) {
  const assets = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buffer) => new Uint8Array(buffer))
    )
  );
  const basenames = urls.map(basename);
  return zip(basenames, assets);
}

function basename(url) {
  return url.split('/').pop();
}

function zip(a, b) {
  return a.map((k, i) => [k, b[i]]);
}