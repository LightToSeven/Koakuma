import { $http } from '@/utils/https'
import {
} from '../mutation-types'
import {
  POST_IMPORT_PRODUCTS
} from '../action-types'

const state = {
}

const getters = {
}

const actions = {
  [POST_IMPORT_PRODUCTS]: async ({ commit }, payload) => {
    try {
      return await $http.post('/import/excel', payload,
        {
          headers: {
            'Content-Type': 'application/json; multipart/form-data'
          }
        })
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
