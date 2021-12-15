//@ts-check

'use strict'

const path = require('path')

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node',

  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            // vscode-nls-dev loader:
            // * rewrite nls-calls
            loader: 'vscode-nls-dev/lib/webpack-loader',
            options: {
              base: path.join(__dirname, 'src')
            }
          },
          {
            // configure TypeScript loader:
            // * enable sources maps for end-to-end source maps
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: true,
                "module": "es6"
              }
            }
          }
        ]
      }
    ]
  }
}
module.exports = config
