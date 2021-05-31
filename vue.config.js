const path = require('path')
const resolve = (dir) => path.join(__dirname, dir) // 路径

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development'].includes(process.env.NODE_ENV)
module.exports = {
  chainWebpack: (config) => {
    // config
    //     // https://webpack.js.org/configuration/devtool/#development
    //     .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    open: true,

    // host: '127.0.0.1',

    port: 3700,

    https: false,

    hotOnly: false,

    proxy: null,

    before: (app) => {}
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
}
