const path = require("path");
const webpack = require("webpack");

// 目录解析
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "./",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            title: "FanWarm - 饭窝精选网址导航"
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
                "@assets": resolve("src/assets"),
                "@components": resolve("src/components"),
                "@views": resolve("src/views"),
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                assist: resolve("src/assets/js/assist.js"),
                bus: [resolve("src/assets/js/bus.js"), "default"]
            })
        ]
    },
    css: {
        extract: true,   //项目打包后会生成单独的css文件
        loaderOptions: {
            sass: {
                // 公用的scss文件
                prependData: `
                    @import "@assets/scss/color.scss";
                    @import "@assets/scss/mixin.scss";
                `
            },
        }
    },
}