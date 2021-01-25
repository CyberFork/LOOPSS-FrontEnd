<template>
  <a-layout-header :class="{ 'global-head': true, 'mobile-head': isMobile }">
    <a-row class="head-wrap" type="flex" justify="center" align="top">
      <a-col :xs="22" :sm="22" :md="20" :lg="20" :xl="16">
        <slot></slot>
        <template v-if="!isMobile">
          <div v-if="user" class="content">
            <a-space size="large">
              <div>{{ user | formatUser }} <a-icon type="copy" @click="copyFn(user)" /></div>
              <a-text link @click="logout"> {{ $t("head.logout") }} </a-text>
              <img class="user-icon" src="@/assets/img/user.png" />
              <!-- <select-lang /> -->
            </a-space>
          </div>
          <div v-else class="content">
            <a-space>
              <a-text link @click="login"> {{ $t("head.login") }} </a-text>
              <!-- <select-lang /> -->
            </a-space>
          </div>
        </template>
        <template v-else>
          <div class="content">
            <img class="logo" src="@/assets/img/logo.png" alt="">
            <img class="menu-btn" v-if="!showSideData" src="@/assets/img/menu.png" alt="" @click="showSideFn(true)">
            <img class="close-btn" v-else src="@/assets/img/close.png" alt="" @click="showSideFn(false)">
          </div>
        </template>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
// ethereum.on("accountsChanged", function (accounts) {
//   console.log(web3.eth.defaultAccount);
//   relogin();
// });
import { toCopy } from 'assets/js/util'
export default {
  name: 'app-head',
  props: ['isMobile', 'showSide'],
  data() {
    return {
      showSideData: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    showSide(cur) {
      this.showSideData = cur
    }
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success(this.$t('message.copySuccess'))
      })
    },
    login() {
      this.$store.dispatch('Login')
    },
    logout() {
      this.$store.dispatch('Logout')
    },
    showSideFn(bool){
      this.showSideData = bool;
      this.$emit('showSideFn', bool)
    }
    // relogin() {
    //   this.$store.dispatch("Logout");
    //   this.$store.dispatch("Login");
    // },
  },
  created() {
    this.showSideData = this.showSide
  }
}
</script>

<style lang="less" scoped>
.global-head {
  font-size: 18/@r;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding-left: 210/@r;
  width: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, .7));
  .content{
    display: flex;
    justify-content: flex-end;
  }
  .head-wrap{
    width: 100%;
    .user-icon{
      width: 40 / @r;
      height: 40 / @r;
      border-radius: 100%;
    }
  }
  &.mobile-head{
    padding-left: 0;
  }
}

.mobile-head{
  padding: 30/@r 0;
  height: auto;
  background: rgba(0, 0, 0, .7);
  .content{
    display: block;
    text-align: center;
  }
  .logo {
    height: 60/@r;
  }
  .menu-btn {
    width: 50/@r;
    position: absolute;
    top: 18/@r;
    right: 0;
    transition: opacity .5s;
  }
  .close-btn{
    width: 36/@r;
    position: absolute;
    top: 14/@r;
    right: 0;
    transition: opacity .5s;
  }
}
</style>
