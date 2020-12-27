<template>
  <a-row type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
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
