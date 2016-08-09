var webpack = require('webpack');
var fs = require('fs');


module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
       // 'webpack/hot/dev-server',
        './app/index.jsx'
    ],
    output: {
        path: __dirname + '/app/',
        filename: 'bundle.js',
        publicPath: '/app/',
        libraryTarget: 'commonjs2'
    },
    stats: {
        colors: true
    },
    externals: fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' }),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.PrefetchPlugin('react'),
        new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')

    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.less']
    },

    target: 'atom',
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:[' +
                    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
                    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}'
            }, {
                test: /\.less$/,
                loader: "style!css!less?strictMath&noIeCompat"
            },
            //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

            // { test: /transition.js$/, loader: 'imports?jQuery=jquery' },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loaders: ['json']
            },

            // Needed for the css-loader when
            // [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
            }
        ]
    }
};
