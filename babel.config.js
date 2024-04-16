export default {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          node: '20',
        },
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    'add-import-extension', // Existing plugin
    ['module-resolver', { // New plugin for module alias resolution
      root: ['./src'],
      alias: {
        '@src': './src',
      },
    }],
  ],
};
