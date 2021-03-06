const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        // https: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: { limit: 40000,
                    name: 'img/[hash]-[name].[ext]',
                    outputPath: 'img/',
                    publicPath:'/src/img'
                       }
                },
                "image-webpack-loader"
            ]
        },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
};
