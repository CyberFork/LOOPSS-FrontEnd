<template>
  <span>
    <span><slot></slot></span>
    <a-tooltip placement="top" v-if="!status">
      <template slot="title">
        <span>复制</span>
      </template>
      <a-icon type="copy" @click.stop.prevent="copy" />
    </a-tooltip>
    <a-tooltip placement="top" v-else-if="status == 1">
      <template slot="title">
        <span>复制成功</span>
      </template>
      <a-icon type="smile" style="color:#52c41a" />
    </a-tooltip>
    <a-tooltip placement="top" v-else-if="status == 2">
      <template slot="title">
        <span>复制失败</span>
      </template>
      <a-icon type="frown" style="color:#f00" />
    </a-tooltip>
  </span>
</template>
<script>
import { toCopy } from 'assets/js/util'
  let Timer = null
  export default {
    name: 'Copy',
    props: {
      content: String
    },
    data() {
      return {
        status: 0 //0 未复制  1复制成功 2复制失败
      }
    },
    methods: {
      copy(e) {
        try {
          const oContent = e.target.parentNode.tagName === 'svg' ? e.target.parentNode.parentNode : e.target.parentNode
          const content = oContent.previousSibling.innerHTML
          toCopy(content).then(res => {
            this.status = 1
          })
        } catch (error) {
          this.status = 2
        }
        this.delayReset()
      },
      delayReset() {
        Timer = setTimeout(() => {
          this.status = 0
        }, 2000)
      }
    },
    created() {
    },
    beforeDestroy() {
      Timer && clearTimeout(Timer)
    }
  }

</script>
<style lang="less" scoped>
i.anticon{
    margin-left: 2px;
}
</style>
