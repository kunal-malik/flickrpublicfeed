var path    = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./app/app.js'
	],
	output: {	
		path: '/app',
		filename: 'bundle.js'
	},
	module: {
	  loaders: [
			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/,
				use : {
				loader : 'babel-loader',
				options : {
					presets : ['react', 'es2015', 'stage-0', "react-hmre"],
				},
			},
		 },
		 {
			test : /\.css/,
			use : [
				{
					loader : 'style-loader'
				},
				{
					loader : 'css-loader',
					options : {
						modules : true,
						localIdentName : '[name]__[local]___[hash:base64:5]'
					}
				}
			]
		},
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			{ test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
	  ]
	}
};