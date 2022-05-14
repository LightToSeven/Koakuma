import { $http } from '@/utils/https'// eslint-disable-next-line
import {
  REFRESH_TOKEN,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_LOADING_REGISTRATION,
  SING_IN_REQUEST_STATUS
} from '../mutation-types'
import {
  GET_TOKEN,
  REGISTRATION,
  INVITE_CODE_CLIENT
} from '../action-types'

const state = {
  isAuthenticated: false,
  userData: JSON.parse(localStorage.getItem('user_data')) || [],
  isRole: localStorage.getItem('user_role') || '', // SUPERVISOR
  showRestorePassword: false,
  showSetNewPassword: false,
  loadingRegistration: false,
  popupLdapWarning: false,
  singInLoading: false,
  checkEmailLoading: false
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userData: state => state.userData,
  isRole: state => state.isRole,
  checkEmailLoading: state => state.checkEmailLoading,
  showRestorePassword: state => state.showRestorePassword,
  showSetNewPassword: state => state.showSetNewPassword,
  singIn: state => state.singIn,
  loadingRegistration: state => state.loadingRegistration,
  singInLoading: state => state.singInLoading,
  popupLdapWarning: state => state.popupLdapWarning
}

const actions = {
  [GET_TOKEN]: async ({ commit }, payload) => {
    try {
      commit(SING_IN_REQUEST_STATUS, true)

      const result = await $http.post('user/login-user', payload)
      console.log(result)
      commit(SET_TOKEN, { token: result.data.tokenData.token, role: result.data.userData.role, userData: result.data.userData })
      return result
    } catch (e) {
      console.log('error: ' + e)
      throw e
    } finally {
      commit(SING_IN_REQUEST_STATUS, false)
    }
  },
  [INVITE_CODE_CLIENT]: async ({ commit }, payload) => {
    try {
      commit(SET_LOADING_REGISTRATION, true)
      return await $http.post('user/send-invitation-for-client', { email: payload })
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      commit(SET_LOADING_REGISTRATION, false)
    }
  },
  [REGISTRATION]: async ({ commit }, payload) => {
    try {
      commit(SET_LOADING_REGISTRATION, true)

      const result = await $http.post('user/registrate-client', payload)
      commit(SET_TOKEN, { token: result.data.tokenData.token, role: result.data.userData.role })

      return result
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      commit(SET_LOADING_REGISTRATION, false)
    }
  }
}

const mutations = {
  [SET_TOKEN] (state, value) {
    console.log('val', value)
    localStorage.setItem('user_token', value.token)
    state.isAuthenticated = true
    localStorage.setItem('user_role', value.role)
    state.isRole = value.role
    localStorage.setItem('user_data', JSON.stringify(value.userData))
    state.userData = value.userData
  },
  [REFRESH_TOKEN] (state, token) {
    localStorage.setItem('user_token', token)
    state.isAuthenticated = true
  },
  [REMOVE_TOKEN] (state) {
    localStorage.removeItem('user_token')
    state.isAuthenticated = false
    localStorage.removeItem('user_role')
    state.isRole = ''
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
