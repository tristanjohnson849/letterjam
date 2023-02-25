import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './src/App.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /(?!\.d\.ts$)\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                resolve: {
                    extensionAlias: {
                        ".js": [".js", ".ts", ".tsx"]                    },
                }
            }, {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(path.dirname(import.meta.url), 'dist'),
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};