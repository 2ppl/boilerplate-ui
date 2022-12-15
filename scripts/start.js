import esbuild from 'esbuild';

esbuild.serve({
  port: 8080,
  servedir: 'public',
}, {
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  format: 'iife',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  entryNames: '[name]',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  bundle: true,
  metafile: true,
}).then((result) => {
  console.log('RESULT');
  console.log(result);
}).catch((error) => {
  console.log('BUILD ERROR:', error);
});

