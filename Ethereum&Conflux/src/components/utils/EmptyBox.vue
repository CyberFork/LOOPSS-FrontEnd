<template>
  <div class="app-empty-box">
    <slot><a-empty /></slot>
  </div>
</template>
<script>
export default {
  name: 'emptyBox'
}
</script>
<style lang="less">
.app-empty-box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
