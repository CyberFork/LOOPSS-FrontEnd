import Vue from 'vue'
const filters = {
  formatNumber(value){
    if (!value) {
      return '0'
    }
    const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    return intPartFormat
  },
  formatTime(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (!dataStr) return '-'
    return moment(dataStr).format(pattern)
  },
  formatUser(str){
    if(!str.length) return ''
    return `${str.slice(0, 6)}****${str.slice(str.length - 4)}`
  },
  toString(obj) {
    if (!obj) return '-'
    return JSON.stringify(obj)
  }
}

for (var k in filters) {
  Vue.filter(k, filters[k])
}
