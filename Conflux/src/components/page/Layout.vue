<template>
  <a-spin size="large" :spinning="globalLoading" :tip="globalLoadingTip" wrapper-class-name="global-loading">
    <a-layout>
      <p-side :collapsed="collapsed"></p-side>
      <a-layout class="layout" :style="mainStyle">
        <p-head :collapsed="collapsed"></p-head>
        <router-view class="main"></router-view>
        <p-foot></p-foot>
      </a-layout>
    </a-layout>
  </a-spin>
</template>

<script>
  // @ is an alias to /src
  import config from '@/config'
  import Head from './Head'
  import Side from './Side'
  import Foot from './Foot'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Layout',
    components: {
      'p-head': Head,
      'p-foot': Foot,
      'p-side': Side
    },
    data() {
      return {
        collapsed: false
      }
    },
    computed: {
      ...mapState(['globalLoading', 'globalLoadingTip', 'clientWidth']),
      mainStyle(){
        let width = this.collapsed ? config.side.collapsedSideWidth : 200
        return `margin-left: ${width}px`
      }
    },
    watch: {
      clientWidth(width) {
        this.collapsed = width < 800
      }
    },
    methods: {
    },
    created() {
      this.collapsed = this.clientWidth < 800
    }
  }

</script>
<style lang="less" scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .main {
      flex: 1;
      padding: 72px 24px 0;
    }
  }

</style>
<style lang="less">
  .global-loading>div:first-child>.ant-spin-spinning {
    position: fixed;
    max-height: none;

    .ant-spin-text {
      margin-top: 30px;
    }
  }

</style>
