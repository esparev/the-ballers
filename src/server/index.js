// Ignores css classes at server side rendering
require('ignore-styles');
require('@babel/polyfill');

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('asset-require-hook')({
  extensions: ['png', 'gif', 'jpg', 'svg', 'ico'],
  name: 'assets/static/[md5:hash].[ext]',
});

require('./server');
