module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    'lodash',
    ['import', { libraryName: 'antd', style: true }]
  ]
}
