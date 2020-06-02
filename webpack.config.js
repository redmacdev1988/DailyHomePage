const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'src'), // change to 'dist' when ready
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './src' // change to './dist' when ready
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          '@babel/preset-env',
                          {
                            plugins: [
                              '@babel/plugin-proposal-class-properties'
                            ]
                          }
                        ]
                    },
                },
               

            }
        ]
    }
    
}