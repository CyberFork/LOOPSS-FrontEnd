import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import storage from 'store'
import Antd from 'ant-design-vue'
import i18n from './locales'
import config from '@/config'
import Notification from 'ant-design-vue/es/notification'

import 'assets/css/global.less' //全局样式

import 'components/utils' //全局公用组件
import 'assets/js/axios'
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

    // const qIvitationUrl = to.query.q
    // if (qIvitationUrl) {
    //   store.dispatch('SaveInvitation', qIvitationUrl)
    //   router.push({ path: '/trust' })
    // }
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
  try {
    await store.dispatch('Login')
    store.dispatch('SetLang', lang)
    console.log(router.options.routes)
    store.dispatch('SetMenu', router.options.routes)
  } catch (err) {
    Notification.error(JSON.stringify(err))
  } finally {
    console.log('after login')
    checkRouter()
    initVue()
  }
}
startApp()
