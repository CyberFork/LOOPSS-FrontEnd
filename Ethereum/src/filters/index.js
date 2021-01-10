import Vue from 'vue'
const filters = {
  formatNumber(value, decimals){
    //decimals  小数点后保留几位
    if (!value) {
      return '0'
    }
    const integer = Math.floor(value)
    const integerStr = integer.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
    const decimal = Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    const decimalStr = decimals ? '.' + decimal.toString().split('.')[1] : ''
    return integerStr + decimalStr
  },
  formatTime(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (!dataStr) return '-'
    return moment(dataStr).format(pattern)
  },
  formatUser(str){
    if (!str.length) return ''
    return `${str.slice(0, 4)}****${str.slice(str.length - 5)}`
  },
  toString(obj) {
    if (!obj) return '-'
    return JSON.stringify(obj)
  }
}

for (var k in filters) {
  Vue.filter(k, filters[k])
}
