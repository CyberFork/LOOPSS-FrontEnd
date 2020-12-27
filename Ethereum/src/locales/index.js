import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from 'store'

// default lang
import zhCN from './lang/zh-CN'
import enUs from './lang/en-US'

let defaultLang = storage.get('lang');
Vue.use(VueI18n)

const messages = {
  'zh-CN': {
    ...zhCN
  },
  'en-US': {
    ...enUs
  }
}

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export function loadLanguageAsync (lang = defaultLang) {
  let locale = messages[lang]
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    if (i18n.locale !== lang) {
      i18n.setLocaleMessage(lang, locale)
      moment.updateLocale(locale.momentName, locale.momentLocale)
      i18n.locale = lang
      return resolve(lang)
    }
    return resolve(lang)
  })
}

export default i18n
