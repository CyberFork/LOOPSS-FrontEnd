<template>
  <a-dropdown placement="bottomRight" :trigger="['click']">
    <a-text link><a-icon type="global" /></a-text>
    <a-menu v-model="selectedKeys" slot="overlay" @click="changeLang">
      <a-menu-item v-for="locale in locales" :key="locale">
        <span role="img" :aria-label="languageLabels[locale]">
          {{languageIcons[locale]}}
        </span>
        {{languageLabels[locale]}}
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex'

const locales = ['zh-CN', 'en-US']
const languageLabels = {
  'zh-CN': '简体中文',
  'en-US': 'English',
}
const languageIcons = {
  'zh-CN': '🇨🇳',
  'en-US': '🇺🇸'
}
export default {
  name: 'SelectLang',
  data(){
    return {
      locales,
      languageLabels,
      languageIcons,
      selectedKeys: [],
    }
  },
  computed:{
    ...mapState(['curLang', 'menu'])
  },
  watch:{
    lang(cur){
      this.selectedKeys = [this.curLang]
    }
  },
  methods: {
    changeLang(item){
      this.selectedKeys = [item.key]
      this.$store.dispatch('SetLang', item.key)
      this.$store.dispatch('SetMenu', this.getMenu(item.key))
    },
    getMenu(lang){
      let arr = [];
      this.menu.map(item => {
        if(item.meta && item.meta.menu){
          item.meta.title = this.$t('menu.' + item.name)
          arr.push(item)
        }
      })
      return arr
    }
  },
  created(){
    this.selectedKeys = [this.curLang]
  }
}
</script>

<style>
</style>
