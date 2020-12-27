'use strict'
import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.headers.w = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const app = new Vue()
const _axios = axios.create(config)

function errorNotic(app, message) {
  app.$notification.error({
    duration: 0,
    message
  })
}

_axios.interceptors.request.use(
  function (config) {
    NProgress.start()
    return config
  },
  function (error) {
    // Do something with request error
    NProgress.done()
    return Promise.reject(error)
  }
)

// 统一处理错误信息
_axios.interceptors.response.use(
  function (response) {
    NProgress.done()
    if (response.status === 200) {
      return response.data
      // 请求返回成功
    } else {
      errorNotic(app, '网络错误' + response.status + '：' + response.statusText)
      return response
    }
  },
  function (error) {
    NProgress.done()
    errorNotic(app, '错误：' + error.message)
    // Do something with response error
    return Promise.reject(error)
  }
)

window.axios = _axios
Object.defineProperties(Vue.prototype, {
  $axios: {
    get(){
      return _axios
    }
  }
})
