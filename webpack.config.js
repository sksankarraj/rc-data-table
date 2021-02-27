const path = require('path');
const webpack = require('webpack')

let entry = {};
entry['react-filterable-table'] = [path.resolve(__dirname, 'src/index.js')];

module.exports = {
	context: path.resolve(__dirname),
	entry: entry,
	mode: 'production',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style!css!']
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		// Allow require('./blah') to require blah.jsx
		extensions: ['.js', '.jsx']
	},
	externals: {
		'react': 'commonjs react',
		'react-dom': 'commonjs react-dom'
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: "async",
			minSize: 1000,
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: 'true',
			cacheGroups: {
				default: {
					minChunks: 1,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'FilterableTable'
	}
}
