import Vue from 'vue'
// import VueTheMask from 'vue-the-mask'
import Toasted from 'vue-toasted'
import { VueMaskDirective } from 'v-mask'

// import 'moment/locale/ru'
// import 'moment/locale/en'

// use
Vue.directive('mask', VueMaskDirective)
Vue.use(Toasted)
// Vue.use(VueTheMask)
