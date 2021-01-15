import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import config from '@/config'
import Api from '@/apis'
import {
  loadLanguageAsync
} from '@/locales'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    menu: [],
    curLang: config.lang, //中zh-CN 英en-US
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    globalLoading: false,
    globalLoadingTip: '',
    invitationAddress: ''
  },
  mutations: {
    SET_USER: (state, address) => {
      state.user = address
    },
    SET_LANG: (state, lang) => {
      state.curLang = lang
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_LOADING(state, option = {}) {
      state.globalLoading = option.isShow
      state.globalLoadingTip = option.tip
    },
    SET_SCREEN(state, screenObj) {
      state.clientWidth = screenObj.width
      state.clientHeight = screenObj.height
    },
    SAVE_INVITATION(state, address = '') {
      state.invitationAddress = address
    }
  },
  actions: {
    SaveInvitation({
      commit
    }, address) {
      commit('SAVE_INVITATION', address)
      //router.push(`/trust?q=${address}`)
    },
    SetMenu({
      commit
    }, routes) {
      const menu = []
      routes.map(item => {
        if (item.meta && item.meta.menu) {
          menu.push(item)
        }
      })
      commit('SET_MENU', menu)
    },
    //开启全局loading
    ShowLoading({
      commit
    }, tip) {
      commit('SET_LOADING', {
        isShow: true,
        tip
      })
    },
    //关闭全局loading
    HideLoading({
      commit
    }) {
      commit('SET_LOADING', {
        isShow: false
      })
    },
    // 登录
    Login({
      commit
    }, params) {
      const redirect = router.currentRoute.query.redirect || router.currentRoute.path
      return Api.login(params)
        .then(user => {
          if (user) {
            console.log(user, 88888888888)
            commit('SET_USER', user)
            if (router.currentRoute.name === 'needLogin') {
              router.push(redirect)
            }
          }
        })
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      this.dispatch('ShowLoading')
      return Api.logout()
        .finally(() => {
          commit('SET_USER', '')
          this.dispatch('HideLoading')
          router.push('/')
        })
    },
    SetScreen({
      commit
    }, screenObj) {
      commit('SET_SCREEN', screenObj)
    },
    SetLang({
      commit
    }, lang) {
      return new Promise((resolve, reject) => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
      })
    }
  }
})
