module.exports = {
    context: __dirname,
    entry: {
        app: './Player.ts'
    },
    output: {
        path: 'build',
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    },
    resolve: {
        alias: {
            //react: 'fast-react'
        },
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    devtool: 'source-map'
};
