<template>
  <div :class="{ 'global-side': true, 'mobile-side': isMobile}">
    <div class="logo-wrap">
      <router-link to="/" title="LOOP">
        <div v-if="isMobile">
          <h1 title="LOOP">
            <img class="logo" src="@/assets/img/logo.png" alt="LOOP">
          </h1>
        </div>
        <div v-else>
          <h1 title="LOOP">
            <img class="logo" src="@/assets/img/logo.png" alt="LOOP">
          </h1>
        </div>
      </router-link>
    </div>
    <div class="menu-wrap">
      <a-menu class="loop-menu" v-model="selectedKeys" mode="inline">
        <a-menu-item v-for="item in menu" :key="item.name" @click="$router.push(item.path)">
          <!-- <a-icon :type="item.meta.menuIcon" /> -->
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <a-menu-item disabled>
          <a-tooltip placement="rightTop" :title="$t('menu.wait')">
            <span>更多</span>
          </a-tooltip>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
import { mapState } from 'vuex'

  export default {
    name: 'Side',
    props: ['isMobile'],
    components: {},
    data() {
      return {
        selectedKeys: []
      }
    },
    computed: {
      ...mapState(['user', 'curLang', 'menu'])
    },
    methods: {
      initOpen(to) {
        to.matched[0] && (this.selectedKeys = [to.matched[0].name])
      }
    },
    created() {
      this.$router.afterEach((to, from) => {
        this.initOpen(to)
      })
      this.initOpen(this.$route)
    }
  }

</script>

<style lang="less" scoped>
.global-side {
  position: absolute;
  top: 0;
  right: ~"calc(100% + 30px)";
  z-index: 100;
  width: 180/@r;
  .logo-wrap {
    padding: 26/@r 32/@r;
    .logo {
      width: 116/@r;
    }
  }
  .loop-menu {
    position: relative;
    border-radius: 30/@r;
    overflow: hidden;
    border: 0;
    &:before{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: #055475 linear-gradient(310deg, #243187 0%, #009CCF 100%);
      opacity: 0.1;
      position: absolute;
      top: 0;
      left: 0;
    }
    /deep/ li{
      border-bottom: 1/@r solid #111;
      width: 100%;
      font-size: 28/@r;
      text-align: center;
      margin: 0;
      background-color: transparent;
      line-height: 100/@r;
      height: 101/@r;
      padding: 0!important;
      color: #fff;
      overflow: visible;
      position: relative;
      &.ant-menu-item-selected{
        &:after{
          width: 80/@r;
          height: 4/@r;
          left: 50%;
          top: 73/@r;
          transform: translateX(-50%);
          background: #00E983;
          border: 0;
        }
      }
      &:last-child{
        border: 0;
      }
    }
  }
}

</style>
