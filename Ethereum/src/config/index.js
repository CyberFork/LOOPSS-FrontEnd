var lang = navigator.language || navigator.userLanguage
export default {
  lang: lang ? lang === 'zh-CN' ? 'zh-CN' : 'en-US' : 'zh-CN'
}
