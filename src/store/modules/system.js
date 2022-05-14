import {
  SET_CUSTOM_BREADCRUMBS_LIST,
  RESET_CUSTOM_BREADCRUMBS_LIST,
  CHANGE_OPEN_MENU,
  CHANGE_OPEN_SECOND_MENU,
  SET_PROPS_SECOND_MENU,
  CHANGE_OPEN_FIRST_MENU,
  CHANGE_OPEN_FILTER,
  FIX_BODY,
  SHOW_GLOBAL_LOADER,
  SHOW_CATALOG_MENU,
  POPUP_TEXT_CONTENT,
  SHOW_POPUP_TEXT_CONTENT
} from '@/store/mutation-types'
import { fixBody } from '@/helpers/variables/index'

const state = {
  globalLoader: false,
  fixBody: false,
  openMenu: true,
  openSecondMenu: false,
  openFirstMenu: false,
  breadcrumbsList: null,
  propsSecondMenu: null,
  showFilter: true,
  showCatalogMenu: false,
  popup: {
    title: '',
    text: ''
  },
  popupTextShow: false
}

const getters = {
  fixBody: state => state.fixBody,
  showCatalogMenu: state => state.showCatalogMenu,
  globalLoader: state => state.globalLoader,
  showFilter: state => state.showFilter,
  openMenu: state => state.openMenu,
  openSecondMenu: state => state.openSecondMenu,
  openFirstMenu: state => state.openFirstMenu,
  breadcrumbsList: state => state.breadcrumbsList,
  propsSecondMenu: state => state.propsSecondMenu,
  popup: state => state.popup,
  popupTextShow: state => state.popupTextShow
}

const mutations = {
  [POPUP_TEXT_CONTENT] (state, content) {
    state.popup = content
  },
  [SHOW_POPUP_TEXT_CONTENT] (state, status) {
    state.popupTextShow = status
  },
  [SET_CUSTOM_BREADCRUMBS_LIST] (state, list) {
    state.breadcrumbsList = list
  },
  [RESET_CUSTOM_BREADCRUMBS_LIST] (state, list) {
    state.breadcrumbsList = null
  },
  [CHANGE_OPEN_MENU] (state, status) {
    state.openMenu = status
    if (status) {
      state.openFirstMenu = false
      state.openSecondMenu = false
    }
    fixBody(status)
  },
  [CHANGE_OPEN_SECOND_MENU] (state, status) {
    state.openSecondMenu = status
  },
  [CHANGE_OPEN_FIRST_MENU] (state, status) {
    state.openFirstMenu = status
  },
  [CHANGE_OPEN_FILTER] (state, status) {
    state.showFilter = status
  },
  [SET_PROPS_SECOND_MENU] (state, list) {
    state.propsSecondMenu = list
  },
  [SHOW_GLOBAL_LOADER] (state, status) {
    state.globalLoader = status
  },
  [FIX_BODY] (state, param) {
    const body = document.querySelector('body')
    if (param) {
      body.classList.add('fix')
    } else {
      body.classList.remove('fix')
    }
    state.fixBody = param
  },
  [SHOW_CATALOG_MENU] (state) {
    state.showCatalogMenu = !state.showCatalogMenu
  }
}

export default {
  state,
  getters,
  mutations
}
