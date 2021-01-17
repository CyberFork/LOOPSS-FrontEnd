/**
 * components util
 */
import Notification from 'ant-design-vue/es/notification'

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 错误通知
 * @param {*} message
 */
export function errorNotic(message) {
  Notification.error({
    message,
    duration: 0
  })
}

export const http = {
  get: function (url, params, success) {
    return axios.get(url, {
      params
    }).then(res => {
      if (res.errno) {
        errorNotic('错误' + res.errno + '：' + res.errmsg)
        return
      }
      success && success(res.data)
      return res.data
    })
  },
  post: function (url, params, success) {
    return axios.post(url, params)
      .then((res) => {
        if (res.errno) {
          errorNotic('错误' + res.errno + '：' + res.errmsg)
          return
        }
        success && success(res.data)
        return res.data
      })
  },
  postStr: function (url, params) {
    console.log('postStr', url)
    return axios.post(url, qs.stringify(params))
    .then((res) => {
      console.log(123123123)
      if (res.errno) {
        errorNotic('错误' + res.errno + '：' + res.errmsg)
        return
      }
      success && success(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
  },
  request: function (option) {
    return axios(option)
  }
}

export function download(href, fileName) {
  var element = document.createElement('a')
  element.href = href
  element.download = fileName
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export function toCopy(content) {
  return new Promise((resolve) => {
    try {
      const oInput = document.createElement('input')
      oInput.style.position = 'fixed'
      oInput.style.zIndex = '-99999'
      oInput.style.widows = '0'
      oInput.style.height = '0'
      oInput.style.opacity = '0'
      oInput.value = content
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.remove()
      resolve()
    } catch (error) {
      errorNotic('复制失败，请您重试')
    }
  })
}
