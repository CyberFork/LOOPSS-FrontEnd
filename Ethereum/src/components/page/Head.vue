<template>
  <a-layout-header :class="{ 'global-head': true, 'mobile-head': isMobile }">
    <a-row class="head-wrap" type="flex" justify="center" align="top">
      <a-col :xs="22" :sm="22" :md="20" :lg="18" :xl="16">
        <slot></slot>
        <div v-if="user" class="content">
          <a-space size="large">
            <div>{{ user | formatUser }} <a-icon type="copy" @click="copyFn(user)" /></div>
            <a-text link @click="logout"> {{ $t("head.logout") }} </a-text>
            <a-avatar size="large" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
            <!-- <select-lang /> -->
          </a-space>
        </div>
        <div v-else class="content">
          <a-space>
            <a-text link @click="login"> {{ $t("head.login") }} </a-text>
            <!-- <select-lang /> -->
          </a-space>
        </div>
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
  props: ['isMobile'],
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success('复制成功')
      })
    },
    login() {
      this.$store.dispatch('Login')
    },
    logout() {
      this.$store.dispatch('Logout')
    }
    // relogin() {
    //   this.$store.dispatch("Logout");
    //   this.$store.dispatch("Login");
    // },
  }
}
</script>

<style lang="less" scoped>
.global-head {
  font-size: 18/@r;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  padding-left: 210/@r;
  width: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, .7));
  .content{
    display: flex;
    justify-content: flex-end;
  }
  .head-wrap{
    width: 100%;
  }
  &.mobile-head{
    padding-left: 0;
  }
}
</style>
