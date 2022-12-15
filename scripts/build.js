import esbuild from 'esbuild';
import fs from 'node:fs';
import htmlPlugin from '@chialab/esbuild-plugin-html';

function getIndexHtml(jsFiles) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="root"></div>
${jsFiles.map((address) => `<script src="/${address}"></script>`).join('')}
</body>
</html>`;
}

const lolKekPlugin = {
  name: 'l-k-p',
  setup: (build) => {
    console.log('build:', build);
    console.log('build.initialOptions.plugins:', build.initialOptions.plugins);
    // build.onLoad({ filter: /[a-zA-Z0-9]/ }, (a) => {
    //   console.log('ON LOAD:', a);
    // });
    // build.onResolve({ filter: /[a-zA-Z0-9]/ }, (a) => {
    //   console.log('ON RESOLVE:', a);
    // });
    build.onStart((result) => {
      console.log('BUILD STARTED:', result);
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
        fs.writeFileSync('dist/index.html', getIndexHtml(['index.js']));
      }
    });
    build.onEnd((result) => {
      console.log('BUILD ENDED:', result);
      // fs.writeFileSync('dist/kek.txt', 'aaa');
    });
  },
};

// runBuild();
runServe();

function runServe() {
  esbuild.serve({
    port: 8080,
    servedir: 'dist',
  }, {
    entryPoints: ['src/index.tsx'],
    outdir: 'dist',
    format: 'iife',
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    entryNames: '[name]',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    plugins: [
      lolKekPlugin,
    ],
    bundle: true,
    metafile: true,
    // splitting: true,
    // minify: true,
  }).then((result) => {
    console.log('RESULT:', result);
  }).catch((error) => {
    console.log('BUILD ERROR:', error);
  });
}

function runBuild() {
  esbuild.build({
    entryPoints: ['src/index.tsx'],
    outdir: 'dist',
    format: 'iife',
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    entryNames: '[name]-[hash]',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    plugins: [
      lolKekPlugin,
    ],
    bundle: true,
    metafile: true,
    // splitting: true,
    // minify: true,
  }).then((result) => {
    const text = esbuild.analyzeMetafileSync(result.metafile, { verbose: false });

    console.log('ANALYZE');
    console.log(text);
  }).catch((error) => {
    console.log('BUILD ERROR:', error);
  });
}

// esbuild.build({
//   entryPoints: ['src/index.html'],
//   outdir: 'dist',
//   format: 'iife',
//   assetNames: 'assets/[name]-[hash]',
//   chunkNames: '[ext]/[name]-[hash]',
//   entryNames: '[name]',
//   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
//   plugins: [
//     htmlPlugin(),
//     lolKekPlugin,
//   ],
//   bundle: true,
//   metafile: true,
//   // splitting: true,
//   minify: true,
// }).then((result) => {
//   const text = esbuild.analyzeMetafileSync(result.metafile, { verbose: false });
//
//   console.log('ANALYZE');
//   console.log(text);
// }).catch((error) => {
//   console.log('BUILD ERROR:', error);
// });
