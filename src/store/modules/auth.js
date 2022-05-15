import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase/config'

import {
  REFRESH_TOKEN,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_LOADING_REGISTRATION,
  SING_IN_REQUEST_STATUS
} from '../mutation-types'
import {
  GET_TOKEN
} from '../action-types'

const state = {
  isAuthenticated: false,
  user: null
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}

const actions = {
  [GET_TOKEN]: async ({ commit }, { email, password }) => {
    try {
      commit(SING_IN_REQUEST_STATUS, true)

      const user = await signInWithEmailAndPassword(firebaseAuth, email, password)

      console.log(user)
      commit(SET_TOKEN, { token: user.user.uid, userData: user.user })
      return user
    } catch (e) {
      throw e
    } finally {
      commit(SING_IN_REQUEST_STATUS, false)
    }
  }
}

const mutations = {
  [SET_TOKEN] (state, value) {
    console.log('val', value)
    localStorage.setItem('user_token', value.token)
    state.isAuthenticated = true
    localStorage.setItem('user', JSON.stringify(value.userData))
    state.user = value.userData
  },
  [REFRESH_TOKEN] (state, token) {
    localStorage.setItem('user_token', token)
    state.isAuthenticated = true
  },
  [REMOVE_TOKEN] (state) {
    localStorage.removeItem('user_token')
    state.isAuthenticated = false
    localStorage.removeItem('user_data')
    state.userData = []
  },
  [SET_LOADING_REGISTRATION] (state, status) {
    state.loadingRegistration = status
  },
  [SING_IN_REQUEST_STATUS] (state, status) {
    state.singInLoading = status
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
