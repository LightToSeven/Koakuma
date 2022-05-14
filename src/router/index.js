import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import TheHome from '../views/website/TheHome.vue'

import TheLogin from '../views/signIn/TheLogin.vue'

import TheAdmin from '../views/admin/TheAdmin.vue'
import TheAdminSetting from '../views/admin/TheSetting.vue'
import TheAdminDashboard from '../views/admin/TheDashboard.vue'
import TheAdminCategory from '../views/admin/TheCategory.vue'
import TheAdminProducts from '../views/admin/TheProducts.vue'

import ThePageNotFound from '../views/errors/ThePageNotFound.vue'
import NotFoundRedirect from '../components/redirects/NotFoundRedirect.vue'

// import VueI18nManager from 'vue-i18n-manager'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const isNotAuthenticated = (to, from, next) => {
  // if (!store.state.auth.isAuthenticated) {
  if (!store.state.auth.isAuthenticated) {
    next()
    return
  }
  next('/admin')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: TheHome
  },
  {
    path: '/admin',
    name: 'admin',
    component: TheAdmin,
    beforeEnter: isAuthenticated,
    children: [
      {
        path: '/',
        name: 'admin-dashboard',
        component: TheAdminDashboard,
        beforeEnter: isAuthenticated
      },
      {
        path: 'setting',
        name: 'admin-setting',
        component: TheAdminSetting,
        beforeEnter: isAuthenticated
      },
      {
        path: 'category',
        name: 'admin-category',
        component: TheAdminCategory,
        beforeEnter: isAuthenticated
      },
      {
        path: 'products',
        name: 'admin-products',
        component: TheAdminProducts,
        beforeEnter: isAuthenticated
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: TheLogin,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/error/404',
    name: 'notFound',
    component: ThePageNotFound
  },
  {
    path: '*',
    component: NotFoundRedirect
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // store.state.system.openMenu = false
  if (!to.matched.length) {
    next('/')
  } else {
    next()
  }
})

export default router
