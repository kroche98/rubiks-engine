const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/main.js',
        worker: './src/js/meet-in-the-middle-worker-rust.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, './src/rust'),
            extraArgs: "--target bundler --no-typescript",
        }),
    ],
    experiments: {
        syncWebAssembly: true,
    },
    target: "webworker"
};