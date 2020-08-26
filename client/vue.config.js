module.exports = {
    // 基本路径
    baseUrl: './',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {   //处理跨域
    // proxy: 'http://10.168.1.213:10035/'
    // proxy: ''
        disableHostCheck: true
    },
    // 关闭eslint
    lintOnSave:false,

    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
}
