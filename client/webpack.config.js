const HTMLWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')

module.exports = {
	entry: {
		main: "./src/index.jsx"
	},
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
				resolve: {
					extensions: [".js", ".jsx"]
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader"
				}
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		}),
		new InterpolateHtmlPlugin(HTMLWebpackPlugin, {
      PUBLIC_URL: '/public',
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    })
	]
}
