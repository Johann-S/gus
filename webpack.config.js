/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path')
const glob = require('glob-all')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const dotenv = require('dotenv')
const { DefinePlugin } = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = async (env, args) => {
  const prod = args.mode === 'production'
  const currentPath = path.join(__dirname)
  const dotEnvParsed = dotenv.config({
    path: `${currentPath}/.env`
  }).parsed

  const paths = {
    src: path.resolve(__dirname, 'src/'),
    index: path.resolve(__dirname, 'src/index.html')
  }

  const envKeys = Object.keys(dotEnvParsed)
    .reduce((prev, next) => ({
      ...prev,
      [`process.env.${next}`]: JSON.stringify(dotEnvParsed[next])
    }), {})

  const htmlWebPackPluginConfig = {
    template: path.resolve(__dirname, 'src/index.html'),
    filename: path.resolve(__dirname, 'public/index.html')
  }

  if (prod) {
    htmlWebPackPluginConfig.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }

  const config = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/public/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@models': path.resolve(__dirname, 'src/models'),
        '@root': path.resolve(__dirname, 'src/')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [!prod && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*']
      }),
      new HtmlWebPackPlugin(htmlWebPackPluginConfig),
      new MiniCssExtractPlugin({
        chunkFilename: '[name].css'
      }),
      new DefinePlugin(envKeys),
      new NodePolyfillPlugin()
    ],
    performance: {
      maxEntrypointSize: 262000
    }
  }

  if (!prod) {
    config.devtool = 'source-map'
    config.devServer = {
      hot: true,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true
      }
    }
    config.plugins.push(new ReactRefreshPlugin())
  } else {
    config.output = {
      ...config.output,
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].chunk.js',
      publicPath: '/'
    }
    config.plugins.push(
      new PurgeCSSPlugin({
        paths: [
          paths.index,
          ...glob.sync(`${paths.src}/**/*.tsx`)
        ],
        safelist: [
          /^svg/,
          /^img/,
          /^dropdown/,
          /^form/,
          /^visually-/,
          /^rbt-aux/,
          /^rbt-loader/,
          /^spinner-border/,
          /^lazy-load-image-/,
          /^user-mention/
        ]
      })
    )

    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: {
              typeofs: false
            },
            output: {
              comments: false
            },
            mangle: true
          }
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        name: false
      },
      runtimeChunk: {
        name: (entryPoint) => `runtime-${entryPoint.name}`
      }
    }
  }

  return config
}
