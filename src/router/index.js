import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import TheHome from '../views/website/TheHome.vue'

import TheLogin from '../views/signIn/TheLogin.vue'
import TheRegistration from '../views/signIn/TheRegistration.vue'

import TheUser from '../views/user/TheUser.vue'
import TheUserDashboard from '../views/user/TheDashboard.vue'
import TheUserSubscriptions from '../views/user/TheSubscriptions.vue'
import TheUserSubscriptionsAdd from '../views/user/Sub/TheSubscriptionsAdd.vue'
import TheUserSubscriptionsView from '../views/user/Sub/TheSubscriptionsView.vue'

import TheAdmin from '../views/admin/TheAdmin.vue'
import TheAdminSetting from '../views/admin/TheSetting.vue'
import TheAdminDashboard from '../views/admin/TheDashboard.vue'
import TheAdminCategory from '../views/admin/TheCategory.vue'
import TheAdminProducts from '../views/admin/TheProducts.vue'

import ThePageNotFound from '../views/errors/ThePageNotFound.vue'
import NotFoundRedirect from '../components/redirects/NotFoundRedirect.vue'

// import VueI18nManager from 'vue-i18n-manager'

Vue.use(VueRouter)
const isAuthenticatedClient = (to, from, next) => {
  // if (store.state.auth.isAuthenticated) {
  // console.log('store.state.auth', store.state.auth)
  if (store.state.auth.isAuthenticated && store.state.auth.isRole === 'CLIENT') {
    next()
    return
  }
  next('/login')
}
const isAuthenticatedAdmin = (to, from, next) => {
  // if (store.state.auth.isAuthenticated) {
  if (store.state.auth.isAuthenticated && store.state.auth.isRole === 'SUPERVISOR') {
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
  if (store.state.auth.isRole === 'SUPERVISOR') {
    next('/admin/admin-dashboard')
  } else if (store.state.auth.isRole === 'CLIENT') {
    next('/user/user-dashboard')
  }
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
    beforeEnter: isAuthenticatedAdmin,
    children: [
      {
        path: '/',
        name: 'admin-dashboard',
        component: TheAdminDashboard,
        beforeEnter: isAuthenticatedAdmin
      },
      {
        path: 'setting',
        name: 'admin-setting',
        component: TheAdminSetting,
        beforeEnter: isAuthenticatedAdmin
      },
      {
        path: 'category',
        name: 'admin-category',
        component: TheAdminCategory,
        beforeEnter: isAuthenticatedAdmin
      },
      {
        path: 'products',
        name: 'admin-products',
        component: TheAdminProducts,
        beforeEnter: isAuthenticatedAdmin
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: TheUser,
    beforeEnter: isAuthenticatedClient,
    children: [
      {
        path: '/',
        name: 'user-dashboard',
        component: TheUserDashboard,
        beforeEnter: isAuthenticatedClient
      },
      {
        path: 'subscriptions',
        name: 'user-subscriptions',
        component: TheUserSubscriptions,
        beforeEnter: isAuthenticatedClient
      },
      {
        path: 'subscriptions/add',
        name: 'user-subscriptions-add',
        component: TheUserSubscriptionsAdd,
        beforeEnter: isAuthenticatedClient
      },
      {
        path: 'subscriptions/view/:id',
        name: 'user-subscriptions-view',
        component: TheUserSubscriptionsView,
        props: true,
        beforeEnter: isAuthenticatedClient
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
    path: '/registration',
    name: 'registration',
    component: TheRegistration,
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
