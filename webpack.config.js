const path = require("path");
let webpack = require("webpack");
module.exports = {
    mode: 'development',
    entry:{
        main:path.resolve(__dirname,'./views/src/main.js')
    },
    output:{
        path: path.resolve(__dirname,'./views/assets/dist/js/'),
        filename:'[name].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ],
    
}