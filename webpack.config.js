var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'React Flux Auth Webpack',
    template: 'app/index.html'
  })],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
		        query: {
		          presets:['react', 'es2015']
		        }
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!less-loader"
			},
			{
				test: /\.(png|jpg|ttf|eot|woff|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000'
			}
		]
	},
}
