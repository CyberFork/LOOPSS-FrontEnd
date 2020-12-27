<template>
  <div>
    <div class="filters">
      <div class="filters-left">
        <a-dropdown placement="bottomLeft">
          <a-button class="operation-btn" type="primary">操作</a-button>
          <a-menu slot="overlay">
            <slot name="actions"></slot>
            <a-menu-item @click="exportCSV">导出CSV</a-menu-item>
            <a-menu-item @click="filterSettingModel = true">查询显示设置</a-menu-item>
          </a-menu>
        </a-dropdown>
        <div class="shorts-wrap">
          <slot name="shortFilters" :showFilters="showFilters"></slot>
        </div>
      </div>
      <div class="filters-right btn-wrap">
        <a-space align="end">
          <slot name="shortcutBtns"></slot>
          <a-tooltip title="查看更多">
            <a-text link><a-icon type="down-square" @click="showMoreFilters = true"/></a-text>
          </a-tooltip>
        </a-space>
      </div>
    </div>
    <div v-show="showMoreFilters">
      <a-divider />
      <slot name="moreFilters" :showFilters="moreFilters"></slot>
      <div class="close-more-btn-wrap">
        <a-text link @click="closeMoreFilters">收起</a-text>
      </div>
    </div>
    <a-modal :maskClosable="false" v-model="filterSettingModel" @ok="setFilters" :afterClose="afterCloseModal">
      <template slot="title">选择以下条件进行置顶展示（仅1~3个）</template>
      <div class="filter-setting">
        <a-checkbox-group v-model="checkedFilters">
          <div v-for="item in allFilters" :key="item">
            <a-checkbox :value="item">{{item}}</a-checkbox>
          </div>
        </a-checkbox-group>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'Filters',
    props: {
      allFilters: {
        type: Array,
        default: () => []
      },
      shortcutFilters: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        showFilters: [],
        checkedFilters: [],
        filterSettingModel: false,
        showMoreFilters: false
      }
    },
    computed: {
      moreFilters(){
        return this.allFilters.filter(item => !this.showFilters.includes(item))
      }
    },
    created() {
      this.showFilters = this.shortcutFilters
      this.checkedFilters = this.shortcutFilters
    },
    methods: {
      closeMoreFilters(){
        this.$emit('resetMoreFilters')
        this.showMoreFilters = false
      },
      exportCSV(){
        this.$emit('exportCSV')
      },
      setFilters(){
        if (this.checkedFilters.length < 1){
          this.$message.error('请至少选择1个快捷筛选')
          return false
        } else if (this.checkedFilters.length > 3){
          this.$message.error('请最多选择3个快捷筛选')
          return false
        }
        this.showFilters = _.cloneDeep(this.checkedFilters)
        this.filterSettingModel = false
        this.$emit('setFilters', this.showFilters)
      },
      afterCloseModal(){
        this.checkedFilters = _.cloneDeep(this.showFilters)
      }
    }
  }
</script>
<style lang="less" scoped>
.filters{
    display: flex;
    justify-content: space-between;
    i.anticon{
      color: #1CB289;
    }
    .filters-left{
      flex: 1;
      display: flex;
      .shorts-wrap{
        margin: 0 16px;
        flex: 1;
      }
    }
    .filters-right{
      flex-shrink: 0;
    }
    .operation-btn, .btn-wrap{
      line-height: 32px;
      margin: 4px 0;
    }
  }
  .close-more-btn-wrap{
    text-align: right;
  }
</style>
