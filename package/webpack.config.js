const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    middleware: './src/middleware.js',
    index: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'grapherrqlLibrary.[name].js',
    library: {
      name: ['grapherrqlLibrary', '[name]'],
      type: 'umd',
    },
    globalObject: 'this', //To make the library build available on both browsers and Node.js.  in case of a web browser 'this' will be the object window.
    // libraryExport: 'default',
    // umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            //bundle all file together
            loader: 'babel-loader',
            //Transform JS and react to ES5
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
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
