module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/github-finder'
      : '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    // module: {
    //     rules: [
    //         {
    //             test: /\.(gif|jpe?g|png|ttf|eot|woff2?)$/,
    //             loader: 'file-loader',
    //             options: {
    //                 name: '[path][name].[ext]'
    //             }
    //         },
    //     ]
    // }
}