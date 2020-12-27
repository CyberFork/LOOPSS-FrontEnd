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

import 'assets/js/axios'
import 'assets/js/web3'
import './filters' //全局公用filter

Vue.use(Antd)
Vue.config.productionTip = false

const lang = storage.get('lang') || config.lang
const user = storage.get('user')

store.dispatch('SetLang', lang)
store.commit('SET_USER', user)
store.dispatch('SetMenu', router.options.routes)

router.beforeEach((to, from, next) => {
  let isLogin = store.state.user
  const redirect = decodeURIComponent(to.path)
  if(!isLogin && (to.path === '/mining' || to.path === '/trust')){
    router.push({
      path: '/error/404',
      query: { redirect }
    })
  }
  next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
