const publicPath = process.env.NODE_ENV === 'production' ? '/graph-gun/' : '/'


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath,
  //noParse: /gun\.js$/, // https://stackoverflow.com/questions/70888451/gun-js-causes-build-warning-critical-dependency-the-request-of-a-dependency-is
})
