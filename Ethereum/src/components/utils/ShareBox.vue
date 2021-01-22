<template>
  <div class="share-box">
    <a-text>{{ $t("mining.task.shareTip") }}</a-text>
    <div class="btn-wrap">
      <a-text link>
        <img v-for="(item, i) in 4" :key="i" src="@/assets/img/user.png" alt="" />
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
  color: #fff;
  margin: 50/@r 0;
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
