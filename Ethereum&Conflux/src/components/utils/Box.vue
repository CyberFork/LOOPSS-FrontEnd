<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :xs="22" :sm="22" :md="20" :lg="20" :xl="16">
      <slot></slot>
    </a-col>
  </a-row>
</template>
<script>
  export default {
    name: 'ABox'
  }
</script>
<style lang="less" scoped>

</style>
