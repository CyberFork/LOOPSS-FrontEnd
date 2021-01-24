import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import storage from 'store'
import Antd from 'ant-design-vue'
import i18n from './locales'
import config from '@/config'

import 'assets/css/global.less' //全局样式

import 'components/utils' //全局公用组件
// import 'assets/js/web3'
import './filters' //全局公用filter

Vue.use(Antd)
Vue.config.productionTip = false
const lang = storage.get('lang') || config.lang

function checkRouter() {
  router.beforeEach((to, from, next) => {
    const isLogin = store.state.user
    const redirect = to.fullPath
    if (!isLogin && (to.path === '/mining' || to.path === '/trust')) {
      next({
        path: '/error/needLogin',
        query: {
          redirect
        }
      })
      return
    }

    if (isLogin && to.path === '/error/needLogin') {
      to.query.redirect ? next( to.query.redirect ) : next()
      return
    }

    next()
  })
}

function initVue() {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}
async function startApp() {
  console.log(11111111111)
  await store.dispatch('Login')
  store.dispatch('SetLang', lang)
  store.dispatch('SetMenu', router.options.routes)
  checkRouter()
  initVue()
}
startApp()
