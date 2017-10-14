const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isProdMode ? 'http://dongsheng1992.cn/api/' : 'api/'
}
