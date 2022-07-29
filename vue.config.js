const publicPath = process.env.NODE_ENV === 'production' ? '/graph-gun/' : '/'


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath,
})
