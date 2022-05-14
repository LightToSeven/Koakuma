import { $http } from '@/utils/https'
import {
  SAVE_REQUEST_CATEGORIES,
  REQUEST_AMOUNT,
  REQUEST_SAVE,
  SAVE_REFERRAL
} from '../mutation-types'
import {
  REQUEST_CATEGORIES,
  CHECK_AMOUNT,
  SAVE_REQUEST,
  PAYED_REQUEST,
  REQUEST_SEO_TEXT,
  REQUEST_REFERRAL,
  REQUEST_REFERRAL_PURCHASE
} from '../action-types'

const state = {
  categories: false,
  requestId: '',
  time: localStorage.getItem('time') || false,
  referralToken: localStorage.getItem('referralToken') || false
}

const getters = {
  categories: state => state.categories,
  requestId: state => state.requestId,
  time: state => state.time,
  referralToken: state => state.referralToken
}

const actions = {
  [REQUEST_CATEGORIES]: async ({ commit }) => {
    try {
      const response = await $http.get('categories')

      commit(SAVE_REQUEST_CATEGORIES, response.data)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_REFERRAL]: async ({ commit }, payload) => {
    try {
      await $http.post(`partners/trace/${payload}/follow`)
      commit(SAVE_REFERRAL, payload)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_REFERRAL_PURCHASE]: async ({ commit }, payload) => {
    try {
      await $http.post(`partners/trace/${payload}/purchase`)
    } catch (e) {
      throw e
    }
  },
  [CHECK_AMOUNT]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('saveAmount', payload)
      console.log('request_id: ' + response.data.data.request_id)
      commit(REQUEST_AMOUNT, response.data.data.request_id)
    } catch (e) {
      throw e
    }
  },
  [SAVE_REQUEST]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('saveFullRequest', payload)
      console.log('request_id: ' + response.data.data.request_id)
      commit(REQUEST_SAVE, response.data.data.request_id)
    } catch (e) {
      throw e
    }
  },
  [PAYED_REQUEST]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('payed', payload)
      console.log('request_id: ' + response)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_SEO_TEXT]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('page', payload)
      return response.data
    } catch (e) {
      throw e
    }
  }
}

const mutations = {
  [SAVE_REFERRAL] (state, value) {
    localStorage.setItem('referralToken', value)
    state.referralToken = value
  },
  [SAVE_REQUEST_CATEGORIES] (state, value) {
    state.categories = value
  },
  [REQUEST_AMOUNT] (state, value) {
    state.requestId = value
  },
  [REQUEST_SAVE] (state, value) {
    state.requestId = value
    if (!localStorage.getItem('time')) {
      const date = new Date()
      const startTime = date.getHours() + ':' + date.getMinutes()
      console.log(startTime)
      localStorage.setItem('time', startTime)
      state.time = startTime
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
