const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
    mode: 'development',
    entry: {
        rubiksMain: './src/js/main.js',
        rubiksWorker: './src/js/meet-in-the-middle-worker-rust.js',
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
        new Dotenv({
            path: `./.env.${env.production ? "production" : "development"}`,
        }),
    ],
    experiments: {
        syncWebAssembly: true,
    },
    target: "webworker"
});
