<template>
  <span class="ant-text" :class="antClass" @click="clickEvent">
    <a v-if="link !== undefined" :href="href" :target="target" rel="noopener noreferrer">
      <slot></slot>
    </a>
    <slot v-else></slot>
  </span>
</template>
<script>
  export default {
    name: 'AText',
    props: {
      success: String,
      warning: String,
      danger: String,
      link: String,
      underline: String,
      strong: String,
      delete: String,
      gray: String,
      block: String,
      href: String,
      target: String,
      disabled: String
    },
    data() {
      return {
        antClass: ''
      }
    },
    methods: {
      clickEvent(...params){
        this.$emit('click', ...params)
      }
    },
    created() {
      const exArr = ['link', 'href', 'target']
      for (const k in this.$props) {
        if (this.$props[k] !== undefined && !exArr.includes(k)) {
          this.antClass += ` ant-${k}`
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .ant-text {
    overflow-wrap: break-word;

    &.ant-block {
      display: block;
    }

    &.ant-success {
      color: #52c41a;
    }

    &.ant-warning {
      color: #faad14;
    }

    &.ant-danger {
      color: #ff4d4f;
    }

    &.ant-gray {
      color:  #cccccc;
    }

    &.ant-strong {
      font-weight: 600;
    }

    &.ant-underline {
      text-decoration: underline;
    }

    &.ant-delete {
      text-decoration: line-through;
    }

    &.ant-disabled {
      color: #cccccc;
      cursor: not-allowed;
      user-select: none;
      a{
        cursor: not-allowed;
      }
    }

    &.ant-ellipsis {
      display: block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

</style>
