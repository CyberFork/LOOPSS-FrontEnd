<template>
  <a-layout-sider class="global-side" v-model="isCollapsed" :trigger="null" theme="light" :collapsedWidth="collapsedSideWidth" :width="sideWidth" collapsible>
    <div class="side-content">
      <div class="logo-wrap">
        <router-link to="/" title="LOOP">
          <div v-if="isCollapsed">
            <img class="logo" src="@/assets/img/logo.png" alt="LOOP">
          </div>
          <div v-else>
            <h1 title="LOOP">
              <img class="logo" src="@/assets/img/logo.png" alt="LOOP"> LOOP
            </h1>
            <h2 class="slogan">{{$t('slogan')}}</h2>
          </div>
        </router-link>
      </div>
      <div class="menu-wrap">
        <a-menu v-model="selectedKeys" mode="inline" theme="light">
          <template v-for="item in menu">
            <a-menu-item v-if="item.meta && item.meta.menu" :key="item.name" @click="$router.push(item.path)">
              <a-icon :type="item.meta.menuIcon" />
              <span>{{item.meta.title}}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </div>
      <div class="about-wrap" v-if="!isCollapsed">
        <a-text link href="https://akpvww.axshare.com/#id=u77t6r" target="_blank">
          <a-button block>{{$t('menu.more')}}</a-button>
        </a-text>
        <div class="about-more">
          <a-icon type="github" />
          <a-icon type="weibo-circle" />
          <a-icon type="twitter" />
          <a-icon type="wechat" />
        </div>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
  // @ is an alias to /src
import config from '@/config'
import { mapState } from 'vuex'

  export default {
    name: 'Side',
    props: ['collapsed'],
    components: {},
    data() {
      return {
        ...config.side,
        isCollapsed: false,
        selectedKeys: []
      }
    },
    watch: {
      collapsed(cur) {
        this.isCollapsed = cur
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
      this.isCollapsed = this.collapsed
      this.$router.afterEach((to, from) => {
        this.initOpen(to)
      })
      this.initOpen(this.$route)
    }
  }

</script>

<style lang="less" scoped>
.global-side {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 100;
  .side-content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .logo-wrap {
      text-align: center;
      padding: 16px 0;

      h1 {
        font-size: 24px;
        font-weight: bold;
      }

      h2 {
        font-size: 18px;
      }

      .logo {
        width: 48px;
      }
    }

    .menu-wrap {
      flex: 1;
    }

    .about-wrap {
      padding: 20px;
      .about-more{
        padding: 20px 0 10px;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}

</style>
