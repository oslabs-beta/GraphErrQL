const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: {
        index: './src/index.ts',  
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.d.ts',
        library: 'grapherrqlLibrary',
        libraryTarget: 'umd',  //universal export, will allow for reference to dist script as var, amd, or common.js syntax
        globalObject: 'this', //To make the library build available on both browsers and Node.js.  in case of a web browser 'this' will be the object window.
        umdNamedDefine: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
}