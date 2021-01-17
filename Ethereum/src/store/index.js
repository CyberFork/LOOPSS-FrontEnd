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
    invitationAddress: '',
    web3: null,
    isWalletSelecting: false

  },
  mutations: {
    SET_USER: (state, address) => {
      state.user = address
    },
    SET_WALLET_SELECTING: (state, isWalletSelecting) => {
      state.isWalletSelecting = isWalletSelecting
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
    SAVE_INVITATION(state, address = '') {
      state.invitationAddress = address
    },
    SET_WEB3(state, web3) {
      state.web3 = web3
    }
  },
  actions: {
    SaveInvitation({ commit }, address) {
      commit('SAVE_INVITATION', address)
      //router.push(`/trust?q=${address}`)
    },
    SetMenu({ commit }, routes) {
      const menu = []
      routes.map(item => {
        if (item.meta && item.meta.menu) {
          menu.push(item)
        }
      })
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
      const { account } = await Api.login(params)
      if (account) {
        commit('SET_USER', account)
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
          commit('SET_WEB3', null)
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
    SetWeb3({ commit }, web3) {
      return new Promise((resolve, reject) => {
        commit('SET_WEB3', web3)
      })
    },
    SetUser({ commit }, account) {
      return new Promise((resolve, reject) => {
        commit('SET_USER', account)
      })
    },
    SetWalletSelecting({ commit }, isSelecting) {
      return new Promise((resolve, reject) => {
        commit('SET_WALLET_SELECTING', isSelecting)
      })
    },
  }
})
