import { $http } from '@/utils/https'
// import { translation } from '@/helpers/translation'
import { globalLoader } from '@/helpers/variables/index'
import {
  SET_LANGUAGE_LIST,
  SET_TRANSLATIONS,
  SET_CATALOG_MENU_LOADING,
  SET_CATALOG_MENU,
  SET_LIST_CATEGORY_FILTERS,
  SET_LIST_CATEGORY_FILTERS_LOADING,
  SET_CONFIG,
  GET_CONFIG_LOADING
} from '../mutation-types'

import {
  GET_LANGUAGE_LIST,
  // GET_TRANSLATIONS,
  GET_CATEGORIES_MENU,
  GET_CATEGORY_FILTERS,
  GET_CONFIG
} from '../action-types'

const state = {
  menu: null,
  config: null,
  configLoading: false,
  menuLoading: false,
  locales: null,
  translations: null,
  filterCategories: null,
  filterCategoriesLoading: false
}

const getters = {
  filterCategories: state => state.filterCategories,
  filterCategoriesLoading: state => state.filterCategoriesLoading,
  menu: state => state.menu,
  menuLoading: state => state.menuLoading,
  locales: state => state.locales,
  translations: state => state.translations,
  config: state => state.config,
  configLoading: state => state.configLoading
}

const actions = {
  // [GET_CONFIG]: async ({ commit }) => {
  //   commit(GET_CONFIG_LOADING, true)
  //   try {
  //     const response = await $http.get('v1/configs')
  //     const config = [
  //       {
  //         id:1
  //       },
  //       {
  //         id:2
  //       }
  //     ]
  //     commit(SET_CONFIG, config)
  //   } catch (e) {
  //     throw e
  //   } finally {
  //     commit(GET_CONFIG_LOADING, false)
  //   }
  // },
  [GET_CONFIG]: async ({ commit }) => {
    commit(GET_CONFIG_LOADING, true)
    try {
      const response = await $http.get('v1/configs')
      const config = [

      ]
      const result = Object.assign(response.data.data, config)
      commit(SET_CONFIG, result)
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      commit(GET_CONFIG_LOADING, false)
    }
  },
  [GET_LANGUAGE_LIST]: async ({ commit }) => {
    try {
      const response = await $http.get('v1/faq')
      commit(SET_LANGUAGE_LIST, response.data.data)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  // [GET_TRANSLATIONS]: async ({ commit }) => {
  //   globalLoader(true)
  //   try {
  //     const response = await $http.get('v1/translations')
  //     const result = Object.assign(response.data, translation)
  //     commit(SET_TRANSLATIONS, result)
  //     return result
  //   } catch (e) {
  //     console.log(e)
  //     throw e
  //   } finally {
  //     globalLoader(false)
  //   }
  // },
  [GET_CATEGORY_FILTERS]: async ({ commit }, payload) => {
    try {
      commit(SET_LIST_CATEGORY_FILTERS_LOADING, true)
      const response = await $http.get(`v1/filter/${payload}`)
      commit(SET_LIST_CATEGORY_FILTERS, response.data.data)
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      commit(SET_LIST_CATEGORY_FILTERS_LOADING, false)
    }
  },
  [GET_CATEGORIES_MENU]: async ({ commit }) => {
    globalLoader(true)
    commit(SET_CATALOG_MENU_LOADING, true)
    try {
      const response = await $http.get('v1/category?include=subcategories')
      commit(SET_CATALOG_MENU, response.data.data)
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      globalLoader(false)
      commit(SET_CATALOG_MENU_LOADING, false)
    }
  }
}

const mutations = {
  [SET_CONFIG] (state, list) {
    state.config = list
  },
  [GET_CONFIG_LOADING] (state, status) {
    state.configLoading = status
  },
  [SET_LANGUAGE_LIST] (state, status) {
    state.locales = status
  },
  [SET_LIST_CATEGORY_FILTERS] (state, list) {
    state.filterCategories = list
  },
  [SET_LIST_CATEGORY_FILTERS_LOADING] (state, status) {
    state.filterCategoriesLoading = status
  },
  [SET_TRANSLATIONS] (state, status) {
    state.translations = status
  },
  [SET_CATALOG_MENU_LOADING] (state, status) {
    state.menuLoading = status
  },
  [SET_CATALOG_MENU] (state, config) {
    state.menu = config
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
