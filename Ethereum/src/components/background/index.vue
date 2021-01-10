<template>
  <canvas id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import './main'
import './stars'
import './commonFunctions'
export default {
  name: 'Backbround',
  computed: {
    width(){
      return this.$store.state.clientWidth
    },
    height() {
      return this.$store.state.clientHeight
    }
  }
}
</script>

<style lang="less" scoped>
#canvas{
  position: fixed;
  top: 0;
  left: 0;
}
</style>
