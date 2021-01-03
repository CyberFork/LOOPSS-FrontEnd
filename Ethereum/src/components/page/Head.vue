<template>
  <a-layout-header class="global-head" theme="light">
    <div v-if="user">
      <a-space>
        <copy>{{ user | formatUser }}</copy>
        <a-text link @click="logout"> {{ $t("head.logout") }} </a-text>
        <a-avatar
          size="small"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        />
        <select-lang />
      </a-space>
    </div>
    <div v-else>
      <a-space>
        <a-text link @click="login"> {{ $t("head.login") }} </a-text>
        <select-lang />
      </a-space>
    </div>
  </a-layout-header>
</template>

<script>
// ethereum.on("accountsChanged", function (accounts) {
//   console.log(web3.eth.defaultAccount);
//   relogin();
// });
export default {
  name: "app-head",
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    login() {
      this.$store.dispatch("Login");
    },
    logout() {
      this.$store.dispatch("Logout");
    },
    // relogin() {
    //   this.$store.dispatch("Logout");
    //   this.$store.dispatch("Login");
    // },
  },
};
</script>

<style lang="less" scoped>
.global-head {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: flex-end;
}
</style>
