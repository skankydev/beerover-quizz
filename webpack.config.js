const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
	entry: {
		quizz:[
			'./src/js/quizz.js',
			'./src/scss/quizz.scss'
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/assets'),
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			],
		},{
			test: /\.vue$/,
			loader: 'vue-loader'
		}],
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' pour webpack 1
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new VueLoaderPlugin()
	],
};
