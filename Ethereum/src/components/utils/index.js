import Vue from 'vue'
import Ellipsis from 'vue-ellipsis-text'

const context = require.context('./', false, /\.vue$/)
context.keys().forEach(key => {
  const component = context(key).default
  Vue.component(component.name, component)
})

Vue.component('Ellipsis', Ellipsis)
