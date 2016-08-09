var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var url = require('url');

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    stats: {
        colors: true
    }
});


// Hot module replacment development server.
server.listen(3000, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});
