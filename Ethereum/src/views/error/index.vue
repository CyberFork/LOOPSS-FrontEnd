<template>
  <div>
    <div class="logo-wrap">
      <h1 title="LOOP">
        <img class="logo" src="@/assets/img/logo.png" alt="LOOP" />
      </h1>
      <h1>信任驱动，无需质押</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.logo-wrap{
  text-align: center;
  padding-top: 100/@r;
  h1{
    font-weight: 600;
    font-size: 32/@r;
  }
  .logo{
    width: 116/@r;
  }
}
</style>
