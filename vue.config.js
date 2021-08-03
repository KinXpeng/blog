var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devServer:{
    port:'8000',
    open:true,
    // proxy: {
    //   '/api': {
    //     target: 'https://api.kinxpeng.com/',//目标地址
    //     ws: true,//是否代理websocket
    //     changeOrigin: true,//是否跨域
    //     pathRewrite: {
    //       '^/api': 'https://api.kinxpeng.com/'//url重写
    //     }
    //   }
    // }
    historyApiFallback: true,
  },
  publicPath: './',
  outputDir:'blog', // 打包文件名
}