const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
            // TODO 1: Add babel Loader that match js files as development
            // TODO 2: Add Loaders for
            //    1. converting sass => css
            //    2. Turns css into commonjs
            //    3. Extract css into files
            /* HINT: structure
        {
          test: REGEX_TO_MATCH_FILES ex. /\.js$/,
          exclude: /node_modules/,
          loader: '',
        } ///////////////////////////////////////done
       */
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        // new WorkboxPlugin.GenerateSW()
        // TODO: configure workbox-webpack-plugin /////////////////////////done
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({

            }), 
            new OptimizeCSSAssetsPlugin({

            })
        ],
        // TODO: Add Optimization for JS and CSS ////////////////////////////////////done
    }
}
