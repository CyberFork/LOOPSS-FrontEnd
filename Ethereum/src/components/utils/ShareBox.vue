<template>
  <div class="share-box">
    <a-text>{{ $t("mining.task.shareTip") }}</a-text>
    <a-space size="large">
      <a-text link><a-avatar size="large" icon="weibo-circle" /></a-text>
      <a-text link><a-avatar size="large" icon="codepen-circle"/></a-text>
      <a-text link><a-avatar size="large" icon="qq" /></a-text>
      <a-text link><a-avatar size="large" icon="linkedin" /></a-text>
    </a-space>
  </div>
</template>
<script>
export default {
  name: 'ShareBox'
}
</script>
<style lang="less" scoped>
.share-box {
  color: #152053;
  margin-top: 50/@r;
  line-height: 64/@r;
  display: flex;
  justify-content: space-between;
}
</style>
