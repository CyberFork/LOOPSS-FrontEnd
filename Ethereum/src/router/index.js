import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/locales'
import Trust from '@/views/Trust.vue'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: i18n.t('menu.home'),
      menu: true,
      menuIcon: 'home'
    }
  },
  {
    path: '/mining',
    name: 'mining',
    component: () => import( /* webpackChunkName: "mining" */ '@/views/Mining.vue'),
    meta: {
      title: i18n.t('menu.mining'),
      menu: true,
      menuIcon: 'setting'
    }
  },
  {
    path: '/trust',
    name: 'trust',
    component: Trust,
    meta: {
      title: i18n.t('menu.trust'),
      menu: true,
      menuIcon: 'user'
    }
  },
  {
    path: '/invited',
    name: 'invited',
    component: Trust,
    meta: {
      title: i18n.t('menu.trust'),
      menu: false,
    }
  },
  {
    name: 'error',
    path: '/error',
    redirect: '/error/404',
    component: () => import( /* webpackChunkName: "error" */ '../views/error'),
    children: [{
      path: '/error/404',
      name: '404',
      component: () => import( /* webpackChunkName: "error" */ '../views/error/404.vue')
    }]
  }, {
    path: '*',
    redirect: '/error/404'
  }
]

export default new Router({
  routes
})
