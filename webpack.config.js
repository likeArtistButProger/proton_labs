const path = require("path");

module.exports = {
	entry: ["./src/index.js", "./src/styles/styles.scss"],
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-arrow-functions"]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
			   use: [
					{
				     loader: 'file-loader',
					  options: {
						 name: "../styles/[name].css"
					  }
					},
					{
					  loader: 'extract-loader'
					},
					{
					  loader: 'css-loader?-url',
					  options: { sourceMap: true } 
					},
					{
					  loader: 'postcss-loader', 
					  options: { sourceMap: true, config: { path: './' } } 
					},
				   {
					  loader: 'sass-loader', 
					  options: { sourceMap: true } 
					}
				]	
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "../styles/[name].png"
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "../styles/[name].svg"
						}
					}
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "public", "js"),
		filename: "bundle.js"
	},
	plugins: [
		
	]
}
