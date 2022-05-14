import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut , updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import firebase from 'firebase/app'
import { firebaseAuth } from '../../firebase/config'

import User from '../user_help'
import {
} from '../mutation-types'
import {
  LOGIN_USER
} from '../action-types'

const state = {
  user: null
}

const getters = {
  user: state => state.user,
  checkUser: state => state.user !== null
}

const actions = {
  [LOGIN_USER]: async ({ commit }, { email, password }) => {
    console.log('tes')
    // eslint-disable-next-line no-useless-catch
    try {
      // logic
      const user = await signInWithEmailAndPassword(firebaseAuth, email, password)

      console.log(user)
      commit('setUser', new User(user.user.uid))
    } catch (error) {
      throw error
    }
  },
  // Logged
  loggedUser ({ commit }, payload) {
    // Send mutation new uid used helped Class
    commit('setUser', new User(payload.uid))
  },
  // Logout
  logoutUser ({ commit }) {
    firebase.auth().signOut()
    // Send mutation null
    commit('setUser', null)
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
