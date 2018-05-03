const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry : {
    	app : ['./src/index.js']
    },
	output: {
		path : path.resolve(__dirname, 'build'),
		filename: './bundle.js'  
	},
	//devtool: process.env.NODE_ENV || 'eval-source-map',// cheap-module-source-map
	module : {
		rules : [
			{
				test  :  /\.js[x]?$/ ,     
				exclude : /node_modules/,     
				use : ['babel-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use : ['url-loader?limit=8192']
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: ['url-loader?limit=50000&name=[path][name].[ext]']
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader','autoprefixer-loader?browsers=last 2 versions']
			},
			{
			   test: /.scss$/,
			   use: ['style-loader','css-loader','sass-loader?sourceMap']
			}
		] 
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['.js', '.jsx' ,'.css' ,'.scss'],
		alias: {
	      'container' : path.resolve(__dirname, 'src/container'),
	      'component': path.resolve(__dirname, 'src/component'),
	      'action': path.resolve(__dirname, 'src/action'),
	      'store' : path.resolve(__dirname, 'src/store'),
	      'router' : path.resolve(__dirname, 'src/router'),
	      'css' : path.resolve(__dirname, 'src/css'),
	      'api' : path.resolve(__dirname, 'src/api'),
	      'images' : path.resolve(__dirname, 'src/images'),
	      'plugins' : path.resolve(__dirname, 'src/plugins')
	    }
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'demo',
			template : './public/index.html',
			filename: 'index.html',
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin() /*webpack --profile --json > stats.json*/
	]
};

