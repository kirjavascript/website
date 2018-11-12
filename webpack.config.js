const webpack = require('webpack');

module.exports = (env={}, args={}) => {

    const config = {
        mode: env.dev ? 'development' : 'production',
        entry : {
            main: './templates/main.js',
            styles: [
                './styles/main.scss',
            ],
        },
        output: {
            path:     __dirname + '/templates',
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: env.dev ? /node_modules/ : void 0,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: false,
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins: [
                                    'transform-decorators-legacy',
                                    'transform-class-properties',
                                    'transform-do-expressions',
                                ],
                            }
                        }
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: env.dev
            }),
        ],
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: {
                // '#app': __dirname + '/app',
            },
        },
        devtool: env.dev && 'source-map',
    };

    return config;
};
