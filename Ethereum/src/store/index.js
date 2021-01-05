import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import config from '@/config'
import Api from '@/apis'
import { loadLanguageAsync } from '@/locales'

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
      state.menu.splice(0, state.menu.length, ...menu)
    },
    SET_LOADING(state, option = {}) {
      state.globalLoading = option.isShow
      state.globalLoadingTip = option.tip
    },
    SET_SCREEN(state, screenObj) {
      state.clientWidth = screenObj.width
      state.clientHeight = screenObj.height
    },
    SAVE_INVITATION(state, address = "") {
      state.invitationAddress = address
    }
  },
  actions: {
    SaveInvitation({ commit }, address) {
      commit('SAVE_INVITATION', address)
  },
  SetMenu({ commit }, menu) {
    commit('SET_MENU', menu)
  },
  //开启全局loading
  ShowLoading({ commit }, tip) {
    commit('SET_LOADING', {
      isShow: true,
      tip
    })
  },
  //关闭全局loading
  HideLoading({ commit }) {
    commit('SET_LOADING', { isShow: false })
  },
  // 登录
  async Login({ commit }, params) {
    const redirect = decodeURIComponent(router.currentRoute.query.redirect || router.currentRoute.path)
    const user = await Api.login(params)
    if (user) {
      commit('SET_USER', user)
      router.push(redirect)
    }
    return user
  },
  // 登出
  Logout({ commit, state }) {
    this.dispatch('ShowLoading')
    return Api.logout()
      .finally(() => {
        commit('SET_USER', '')
        this.dispatch('HideLoading')
        router.push('/')
      })
  },
  SetScreen({ commit }, screenObj) {
    commit('SET_SCREEN', screenObj)
  },
  SetLang({ commit }, lang) {
    return new Promise((resolve, reject) => {
      commit('SET_LANG', lang)
      loadLanguageAsync(lang)
    })
  },
}
})
