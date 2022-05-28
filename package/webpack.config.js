const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    middleware: './src/middleware.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'middleware.d.ts',
    library: 'grapherrqlLibrary',
    libraryTarget: 'umd', //universal export, will allow for reference to dist script as var, amd, or common.js syntax
    globalObject: 'this', //To make the library build available on both browsers and Node.js.  in case of a web browser 'this' will be the object window.
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  plugins: [new CleanWebpackPlugin()],
};
