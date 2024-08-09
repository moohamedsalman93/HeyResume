import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react()
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'node_modules/swiftlatex/dist/swift*.js',
    //       dest: 'public',
    //     },
    //     {
    //       src: 'node_modules/swiftlatex/dist/*.wasm',
    //       dest: 'public',
    //     },
    //   ],
    // }),
  ],
  // server: {
  //   mimeTypes: {
  //     'application/javascript': ['js'],
  //     'application/wasm': ['wasm'], // Ensure .wasm files are served with the correct MIME type
  //   },
  // },
});