<template>
  <div>
    <div class="logo-wrap">
      <h1 title="LOOP">
        <img class="logo" src="@/assets/img/logo.png" alt="LOOP" /> LOOP
      </h1>
      <h2>{{$t('slogan')}}</h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.logo-wrap{
  text-align: center;
  padding-top: 100px;
  h1{
    font-weight: 600;
    font-size: 32px;
  }
  h2{
    font-weight: 600;
    font-size: 18px;
  }
  .logo{
    width: 60px;
  }
}
</style>
