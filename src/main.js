// utils
import './utils/plugins'
import './utils/translations'
import './utils/global-components'
import './registerServiceWorker'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Carousel3d from 'vue-carousel-3d'
Vue.use(Carousel3d)

import LazyYoutubeVideo from 'vue-lazy-youtube-video'
Vue.component('LazyYoutubeVideo', LazyYoutubeVideo)
Vue.config.productionTip = false

if (localStorage.getItem('user_token')) {
  store.state.auth.isAuthenticated = true
}

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})

Vue.initI18nManager().then(() => {
  app.$mount('#app')
})
