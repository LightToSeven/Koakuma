import { $http } from '@/utils/https'
import {
} from '../mutation-types'
import {
  GET_SUB_LIST,
  CREATE_SUB,
  GET_CARTS_SUB,
  GET_CART_SUB,
  CANCEL_SUB
} from '../action-types'

const state = {
}

const getters = {
}

const actions = {
  [GET_SUB_LIST]: async ({ commit }) => {
    try {
      const response = await $http.get('orders')
      return response
    } catch (e) {
      throw e
    }
  },
  [GET_CARTS_SUB]: async ({ commit }, id) => {
    try {
      // const response = await $http.get(`orders/${id}`)
      const response = await $http.get(`orders/${id}/carts`)
      return response
    } catch (e) {
      throw e
    }
  },
  [GET_CART_SUB]: async ({ commit }, payload) => {
    try {
      const response = await $http.get(`orders/${payload.orderId}/carts/${payload.cartId}`)
      return response
    } catch (e) {
      throw e
    }
  },
  [CREATE_SUB]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('orders', payload)
      return response
    } catch (e) {
      throw e
    }
  },
  [CANCEL_SUB]: async ({ commit }, id) => {
    try {
      const response = await $http.patch(`orders/${id}/cancel`)
      return response
    } catch (e) {
      throw e
    }
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
