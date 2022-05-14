import Vue from 'vue'
import VueI18nManager from 'vue-i18n-manager'
import store from '@/store'
import router from '@/router'
import locales from '@/locales'

Vue.use(VueI18nManager, {
  store,
  router,
  config: {
    defaultCode: 'ru-RU',
    languages: [
      {
        name: 'English',
        title: 'Eng',
        key: 'en',
        code: 'en-US',
        urlPrefix: 'en',
        icon: '/public/flag/flag-english.svg',
        translationKey: 'en'
      },
      {
        name: 'Russian',
        title: 'Rus',
        key: 'ru',
        code: 'ru-RU',
        urlPrefix: 'ru',
        icon: '/public/flag/flag-russia.svg',
        translationKey: 'ru'
      }
    ],
    translations: locales
  }
})
