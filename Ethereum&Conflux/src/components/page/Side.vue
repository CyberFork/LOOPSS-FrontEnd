<template>
  <div :class="{ 'mobile-side': isMobile, 'pc-side': !isMobile, show: show }">
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
        <a-menu-item v-for="item in menu" :key="item.name" @click="changeMenu(item)">
          <!-- <a-icon :type="item.meta.menuIcon" /> -->
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <a-menu-item disabled>
          <a-tooltip placement="right">
            <template slot="title">
              <span>{{ $t('menu.wait') }}</span>
            </template>
            {{ $t('menu.more') }}
          </a-tooltip>
          <div @click="getMore"></div>
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
    props: ['isMobile', 'showSide'],
    components: {},
    data() {
      return {
        selectedKeys: [],
        show: false
      }
    },
    computed: {
      ...mapState(['user', 'curLang', 'menu'])
    },
    watch: {
      showSide(cur) {
        this.show = this.showSide
      }
    },
    methods: {
      initOpen(to) {
        to.matched[0] && (this.selectedKeys = [to.matched[0].name])
      },
      getMore(){
        this.$message(this.$t('menu.moreTip'))
      },
      changeMenu(item) {
        this.show = false
        this.$router.push(item.path)
        this.$emit('showSideFn', false)
      }
    },
    created() {
      this.$router.afterEach((to, from) => {
        this.initOpen(to)
      })
      this.initOpen(this.$route)
      this.show = this.showSide
    }
  }

</script>

<style lang="less" scoped>
@menu-border-color: rgba(100, 100, 100, .3);
.menu-wrap .loop-menu {
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
    border-bottom: 1px solid @menu-border-color;
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
        height: 4px;
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
.pc-side {
  position: absolute;
  top: 0;
  right: ~"calc(100% + 30px)";
  width: 180/@r;
  .logo-wrap {
    padding: 26/@r 32/@r;
    .logo {
      width: 116/@r;
    }
  }
}

.mobile-side{
  width: 100%;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  top: 128/@r;
  left: 0;
  max-height: 0;
  overflow: hidden;
  transition: all .5s;
  &.show{
    max-height: 760px;
  }
  .logo-wrap{
    display: none;
  }
  .loop-menu {
    &:before{
      display: none;
    }
    /deep/ li{
      font-size: 40/@r;
      &:first-child{
        border-top: 1px solid @menu-border-color;
      }
      &.ant-menu-item-selected{
        color: #00E983;
        &:after{
          display: none;
        }
      }
    }
  }
}

</style>
