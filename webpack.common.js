const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    entry: {
        'dount': path.resolve(__dirname, "src/assets/js/dount.js")
        , 'gauge': path.resolve(__dirname, "src/assets/js/gauge.js")
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        /*filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: 'assets/js/[name].[chunkhash].js'*/
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js'
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules\/(.*)\.js/,
                    name: 'vendor',
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        extensions: ['.js']
        , alias: {
            "three": path.resolve(__dirname, "src/assets/js/utils/three.js")
            , "vis3chart": getUserHome() + "/udocs/website/vis3/vis3chart/dist/index.js"
            //"vischart": "/home/suches/udocs/website/vis/vischart/dist/index.js"
        }
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["es2015"]
                }
            },
            exclude: /node_modules/,
            include: '/src/'
        }, {
            test: /(\.css|\.scss|\.sass)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [require('autoprefixer')({
                        'browsers': ['> 1%', 'last 2 versions']
                    })]
                }

            }]
        }, {
            test: /\.(gif|jpg|png|ico)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: '../../',
                    outputPath: 'assets/css/'
                }
            }
        }, {
            test: /\.(svg|woff|otf|ttf|eot)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: '../../',
                    outputPath: 'assets/css/'
                }
            }
        }
        , {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }
        }
          , {
            test: /\.txt$/,
            use: 'raw-loader'
          }
        ]
    },
    plugins: [
        //清空dist
        /*
        new HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(["dist"], {
            root: '',
            verbose: true,
            dry: false
        }),
        */
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "src/assets/img"),
            to: path.resolve(__dirname, "dist/assets/img")

        }/*, {
            from: path.resolve(__dirname, "src/assets/media"),
            to: path.resolve(__dirname, "dist/assets/media")
        }*/]),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].min.css',
            chunkFilename: 'assets/css/[name]..css'
        }),
        /*
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        })
        */

    ]
};
