<template>
  <div class="share-box">
    <a-text>{{ $t("mining.task.shareTip") }}</a-text>
    <div class="btn-wrap">
      <a-text link>
        <img v-for="(item, i) in 4" :key="i" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" />
      </a-text>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShareBox',
  data(){
    return {
      shareList: [{
        src: '',
        href: ''
      }]
    }
  }
}
</script>
<style lang="less" scoped>
.share-box {
  color: #152053;
  margin: 50/@r 40/@r;
  line-height: 64/@r;
  display: flex;
  justify-content: space-between;
  img{
    width: 64/@r;
    height: 64/@r;
    background: #fff;
    margin-right: 24/@r;
    border-radius: 100%;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
