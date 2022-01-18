const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let mode = 'development';
if(process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log('mode: ' + mode);

module.exports = {
  mode: mode,
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  devServer: {
    open: true,
    port: 'auto',
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'src/**'),
      watch: true,
    },
    // liveReload: true,
    // watchFiles: path.resolve(__dirname, 'src/**/*'),
  },
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public/**/*'),
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['**/.gitkeep', '**/README.md'],
            }
          }
        ]
      })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                      [
                          'postcss-preset-env',
                          {
                          //  options
                          }
                      ]
                  ]
                }
              }
            },
            'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        use: [
          // svg sprite
          { loader: 'svg-sprite-loader' },
          // svg optimizer
          'svgo-loader'
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}