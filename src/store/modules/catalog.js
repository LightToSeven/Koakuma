import { $http } from '@/utils/https'
import {
} from '../mutation-types'
import {
  REQUEST_CATEGORY_LIST,
  REQUEST_CREATE_CATEGORY,
  REQUEST_UPDATE_CATEGORY,
  DELAY_CATEGORY,
  REQUEST_PRODUCT_LIST,
  REQUEST_PRODUCT_LIST_FILTER,
  DELAY_PRODUCT,
  REQUEST_CREATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  REQUEST_SAVE_PRODUCT_IMAGE,
  REQUEST_PRODUCT,
  REQUEST_CATEGORY,
  REQUEST_PRODUCT_CATEGORY,
  REQUEST_CATEGORY_ID
} from '../action-types'

const state = {
}

const getters = {
}

const actions = {
  [REQUEST_CATEGORY_LIST]: async ({ commit }) => {
    try {
      return await $http.get('categories')
    } catch (e) {
      throw e
    }
  },
  [REQUEST_CREATE_CATEGORY]: async ({ commit }, payload) => {
    try {
      return await $http.post('categories', payload)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_UPDATE_CATEGORY]: async ({ commit }, payload) => {
    try {
      return await $http.put(`categories/${payload.id}`, payload)
    } catch (e) {
      throw e
    }
  },
  [DELAY_CATEGORY]: async ({ commit }, payload) => {
    try {
      return await $http.delete(`categories/${payload}`)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_PRODUCT_LIST]: async ({ commit }) => {
    try {
      return await $http.get('/products?page=0&size=10000')
    } catch (e) {
      throw e
    }
  },
  [REQUEST_PRODUCT_LIST_FILTER]: async ({ commit }, idCategory) => {
    try {
      return await $http.get(`/categories/${idCategory}/products?page=0&size=10000`)
    } catch (e) {
      throw e
    }
  },
  [DELAY_PRODUCT]: async ({ commit }, payload) => {
    try {
      return await $http.delete(`/categories/${payload.categoryId}/products/${payload.productId}`)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_CREATE_PRODUCT]: async ({ commit }, payload) => {
    try {
      return await $http.post(`/categories/${payload.categoryId}/products`, payload)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_UPDATE_PRODUCT]: async ({ commit }, payload) => {
    try {
      return await $http.put(`/categories/${payload.categoryId}/products/${payload.id}`, payload)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_SAVE_PRODUCT_IMAGE]: async ({ commit }, payload) => {
    try {
      const formData = new FormData()
      formData.append('image', payload.image)
      return await $http.post(`/categories/${payload.categoryId}/products/${payload.id}/images/uploads`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
    } catch (e) {
      throw e
    }
  },
  [REQUEST_PRODUCT]: async ({ commit }, payload) => {
    try {
      return await $http.get(`/products/${payload}`)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_PRODUCT_CATEGORY]: async ({ commit }, payload) => {
    try {
      const response = await $http.get(`/categories/${payload}/products`)
      return response
    } catch (e) {
      throw e
    }
  },
  [REQUEST_CATEGORY]: async ({ commit }, payload) => {
    try {
      console.log('payload:' + payload)
      return await $http.get(`/category/slug/${payload}`)
    } catch (e) {
      throw e
    }
  },
  [REQUEST_CATEGORY_ID]: async ({ commit }, payload) => {
    try {
      console.log('payload:' + payload)
      return await $http.get(`/category/${payload}`)
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
