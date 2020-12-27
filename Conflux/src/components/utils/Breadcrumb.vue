<template>
  <div>
    <a-breadcrumb>
      <span slot="separator">></span>
      <a-breadcrumb-item v-for="(item, i) in breadcrumbData" :key="i">
        <span v-if="i === breadcrumbData.length - 1">{{item.meta.title}}</span>
        <router-link v-else :to="item.path">{{item.meta.title}}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'Breadcrumb',
    data () {
      return {
        breadcrumbData: []
      }
    },
    computed: {},
    created () {
      this.breadcrumbData = this.$route.matched.filter(a => a.path && a.meta && a.meta.title).sort((a, b) => a.path.length - b.path.length)
      this.$router.afterEach(to => {
        this.breadcrumbData = to.matched.filter(a => a.path && a.meta && a.meta.title).sort((a, b) => a.path.length - b.path.length)
      })
    }
  }
</script>
<style lang="less" scoped>
/deep/ .ant-breadcrumb{
    margin: 0 0 5px;
}
</style>
