module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactColumns',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    rules: {
      css: {
        options: {
          modules: true
        }
      }
    }
  },
}
