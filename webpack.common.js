const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/home.html",
            filename: "view/home.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/teams.html",
            filename: "view/teams.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/favorite.html",
            filename: "view/favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/detail.html",
            filename: "view/detail.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/detailFavorite.html",
            filename: "view/detailFavorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/nav.html",
            filename: "nav.html"
        }),
        new WebpackPwaManifest(
            {
                name: "Football Catalogue",
                gcm_sender_id: "258852538800",
                short_name: "Football",
                description: "Show Football Information",
                background_color: "#304266",
                theme_color: "#304266",
                start_url: '/',
                display: "standalone",
                icons: [
                    {
                        src: path.resolve("web_icon.png"),
                        sizes: [96, 128, 192, 256, 384, 512]
                    }
                ],
            }
        ),
        new WorkboxPlugin.InjectManifest({
            swDest: 'sw.js',
            swSrc: './src/sw.js',
        }),
    ],
}