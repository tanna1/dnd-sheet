const path = require('path'), webpack = require('webpack');

module.exports = {
  mode: 'development',
  // The entry point file described above
  entry: {login: './src/entry/login.js', menu: './src/entry/menu.js', sheet: './src/entry/sheet.js'}, //'./src/index.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name]_b.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    })
  ],
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
};
