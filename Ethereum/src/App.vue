<template>
  <a-config-provider :locale="locale">
    <layout></layout>
  </a-config-provider>
</template>
<script>
// @ is an alias to /src
import 'ant-design-vue/dist/antd.less'
import Layout from '@/components/page/Layout'
export default {
  name: 'App',
  components: {
    Layout
  },
  computed: {
    locale () {
      return this.$i18n.getLocaleMessage(this.$store.state.curLang).antLocale
    }
  },
  mounted(){
    this.$store.dispatch('SetScreen', {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
    window.onresize = () => {
      this.$store.dispatch('SetScreen', {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }
  }
}
</script>
