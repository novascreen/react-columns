module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactColumns',
    jsNext: true,
    umd: true
  },
  webpack: {
    loaders: {
      css: {
        query: {
          modules: true
        }
      }
    }
  },
}
