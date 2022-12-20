// import esbuild from 'esbuild';
// import servor from 'servor';
// import fs from 'node:fs';
// const servor = require('servor');
const esbuild = require('esbuild');
const liveServer = require("live-server");
const fs = require('node:fs');

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
    // console.log('build:', build);
    // console.log('build.initialOptions.plugins:', build.initialOptions.plugins);
    const dist = build?.initialOptions?.outdir;
    if (!dist) {
      throw new Error('Need add "outdir" in build config');
    }
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
      fs.writeFileSync(`${dist}/index.html`, getIndexHtml(['index.js']));
    }
    liveServer.start({
      port: 8080,
      root: dist,
      file: 'index.html',
      proxy: [['/api', 'http://localhost:3000/api']],
      open: false,
    });
    build.onStart((result) => {
      console.log('BUILD STARTED:', result);
    });
    build.onEnd((result) => {
      // console.log('BUILD ENDED:', result);
      // console.log('BUILD ENDED result.metafile.outputs:', result.metafile.outputs);
      const files = Object.keys(result.metafile.outputs).map(
        (path) => path.split('dist/').join(''),
      );
      console.log('OUTPUTS:', files);
      fs.writeFileSync('dist/index.html', getIndexHtml(files));
    });
  },
};

esbuild.build({
  entryPoints: ['src/index.tsx'],
  outdir: 'dist',
  format: 'iife',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  entryNames: '[name]-[hash]',
  // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  platform: 'browser',
  plugins: [
    lolKekPlugin,
  ],
  bundle: true,
  metafile: true,
  // splitting: true,
  // minify: true,
  watch: true,
}).then((result) => {
  console.log('BUILD SUCCESS:', result.errors);
}).catch((error) => {
  console.log('BUILD ERROR:', error);
});

// async function serve(){
//   console.log('running server from: http://localhost:8080/');
//   await servor({
//     // pass any options to servor here...
//     browser: true,
//     root: 'dist',
//     port: 8080,
//   });
// }

// if (!fs.existsSync('dist')) {
//   fs.mkdirSync('dist');
// }

// serve()
//   .then((result) => console.log('SERVE RESULT:', result))
//   .catch((error) => console.log('SERVE ERROR:', error));

// liveServer.start({
//   port: 8080,
//   root: './dist',
//   file: 'index.html',
//   proxy: [['/api', 'http://localhost:3000/api']],
//   open: false,
// });
