<template>
  <a-layout-footer>Copyright&copy;{{year}} xxx.cn 版权所有 xxxxxxxxxx</a-layout-footer>
</template>
<script>
export default {
  name: 'app-footer',
  data(){
    return {
      begin: '2019',
      now: new Date().getFullYear()
    }
  },
  computed: {
    year(){
      return this.now === this.begin ? this.now : (this.begin + '-' + this.now)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-layout-footer{
  text-align: center;
}
</style>
