<template>
  <a-spin size="large" :spinning="globalLoading" :tip="globalLoadingTip" wrapper-class-name="global-loading">
    <a-layout :class="{ layout: true, 'pc-layout': !isMobile, 'mobile-layout': isMobile }">
      <p-head :isMobile="isMobile" :showSide="showSide" @showSideFn="showSideFn">
        <p-side :isMobile="isMobile" :showSide="showSide" @showSideFn="showSideFn"></p-side>
      </p-head>
      <a-layout class="main-wrap">
        <router-view class="main"></router-view>
      </a-layout>
    </a-layout>
  </a-spin>
</template>

<script>
  // @ is an alias to /src
  import Head from './Head'
  import Side from './Side'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Layout',
    components: {
      'p-head': Head,
      'p-side': Side
    },
    data() {
      return {
        isMobile: false,
        showSide: false
      }
    },
    computed: {
      ...mapState(['globalLoading', 'globalLoadingTip', 'clientWidth'])
    },
    watch: {
      clientWidth(width) {
        this.isMobile = width < 768
      }
    },
    methods: {
      showSideFn(bool){
        this.showSide = bool
      }
    },
    created() {
      this.isMobile = this.clientWidth < 768
    }
  }

</script>
<style lang="less" scoped>
  .layout {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main-wrap{
      flex: 1;
      padding-left: 210/@r;
      overflow: auto;

      .main{
        padding: 134/@r 0 0;
      }
    }
    &.mobile-layout{
      .main-wrap{
        padding: 0;
      }
    }
  }

</style>
<style lang="less">
  .global-loading>div:first-child>.ant-spin-spinning {
    position: fixed;
    max-height: none;

    .ant-spin-text {
      margin-top: 30/@r;
    }
  }

</style>
