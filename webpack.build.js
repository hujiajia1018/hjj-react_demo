const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry : {
    	app : ['./src/index.js'],
    	vendors: ['immutable','react','prop-types','react-dom','react-redux','react-router','redux','redux-thunk','react-addons-css-transition-group','react-slick','slick-carousel','blueimp-md5'] //需要打包的第三方插件
    },
	output: {
		//path : path.resolve(__dirname, 'build'),
		//filename: './bundle.js'
		path : path.resolve(__dirname, 'dev'),
		publicPath : './',
		filename: '[name].[chunkhash:8].js'
	},
	module : {
		rules : [
			{
				test  :  /\.js[x]?$/ ,     
				exclude : /node_modules/,     
				use : ['babel-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use : ['url-loader?limit=8192&name=images/[name].[ext]']  //在 dev下新建images文件夹 图片倒过来
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: ['url-loader?limit=50000&name=[path][name].[ext]']
			},
			{
				test: /\.css$/,
				use : ExtractTextPlugin.extract({
					fallback : "style-loader",
					use : "css-loader!autoprefixer-loader"
				})
			},
			{
			   test: /.scss$/,
			   use : ExtractTextPlugin.extract({
			   		fallback : "style-loader",
			   		use : "css-loader!sass-loader"
			   })
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
			//title: 'demo',
			template : './public/index.html',
			filename: 'index.html'
		}),
		new HtmlwebpackPlugin({
			template : './public/wx_login.html',
			inject : false,
			filename: 'wx_login.html'
		}),
		new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(css|js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
		//提取公共部分资源
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', //与entry中的vendors对应
            filename: 'common.bundle.js', //输出的公共资源名称
            minChunks: Infinity //对所有entry实行这个规则
        }),
        new ExtractTextPlugin({
        	filename : '[name].[chunkhash:8].css',
            allChunks: true 
        }),
        new CleanWebpackPlugin(['dev']) // 删除dev目录
	]
};