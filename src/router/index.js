import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import TheHome from '../views/website/TheHome.vue'

import TheLogin from '../views/signIn/TheLogin.vue'

import TheAdmin from '../views/admin/TheAdmin.vue'
import TheAdminSetting from '../views/admin/TheSetting.vue'
import TheAdminDashboard from '../views/admin/TheDashboard.vue'
import TheAdminListInfo from '../views/admin/TheListInfo.vue'
import TheAdminProducts from '../views/admin/TheProducts.vue'
import TheAdminPartners from '../views/admin/ThePartners.vue'
import TheAdminTeams from '../views/admin/TheTeams.vue'

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
    redirect: '/admin/dashboard',
    beforeEnter: isAuthenticated,
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: TheAdminDashboard,
        beforeEnter: isAuthenticated
      },
      {
        path: 'list-info',
        name: 'admin-list-info',
        component: TheAdminListInfo,
        beforeEnter: isAuthenticated
      },
      {
        path: 'products',
        name: 'admin-products',
        component: TheAdminProducts,
        beforeEnter: isAuthenticated
      },
      {
        path: 'partners',
        name: 'admin-partners',
        component: TheAdminPartners,
        beforeEnter: isAuthenticated
      },
      {
        path: 'teams',
        name: 'admin-teams',
        component: TheAdminTeams,
        beforeEnter: isAuthenticated
      },
      {
        path: 'setting',
        name: 'admin-setting',
        component: TheAdminSetting,
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
