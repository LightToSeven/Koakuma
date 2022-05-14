// import Vue from 'vue'
import { $http } from '@/utils/https'
import {
  SET_USER_REF_LINK,
  SET_USER_BALANCE,
  SET_USER_DETAIL,
  CODE_USER_DETAIL_STATUS,
  SET_USER_REFERALS
} from '../mutation-types'
import {
  GET_USER_DETAIL,
  GET_USER_REFERALS,
  EDIT_SETTING,
  EDIT_PASSWORD,
  FORGOT_PASSWORD
} from '../action-types'

const state = {
  balance: '0 ₽',
  refLink: '',
  userDetail: [],
  codeUserDetailStatus: false,
  userReferals: []
}

const getters = {
  balance: state => state.balance,
  userDetail: state => state.userDetail,
  codeUserDetailStatus: state => state.codeUserDetailStatus,
  refLink: state => state.refLink,
  userReferals: state => state.userReferals
}
const actions = {
  [GET_USER_DETAIL]: async ({ commit }, payload) => {
    try {
      commit(CODE_USER_DETAIL_STATUS, true)

      const response = await $http.get('detail')
      console.log(response.data.data.user)
      commit(SET_USER_DETAIL, response.data.data.user)
      commit(SET_USER_BALANCE, response.data.data.user.balance + ' ₽')
      commit(SET_USER_REF_LINK, response.data.data.user.ref_link)
    } catch (e) {
      throw e
    } finally {
      commit(CODE_USER_DETAIL_STATUS, false)
    }
  },
  [GET_USER_REFERALS]: async ({ commit }, payload) => {
    try {
      const response = await $http.get('refs/all')
      console.log(response.data.data.referrals)
      commit(SET_USER_REFERALS, response.data.data.referrals)
    } catch (e) {
      throw e
    } finally {
    }
  },
  [EDIT_SETTING]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('settings/save', payload)
      console.log(response.data.data.user)
      commit(SET_USER_DETAIL, response.data.data.user)
      commit(SET_USER_BALANCE, response.data.data.user.balance + ' ₽')
      commit(SET_USER_REF_LINK, response.data.data.user.ref_link)
    } catch (e) {
      throw e
    } finally {
    }
  },
  [EDIT_PASSWORD]: async ({ commit }, payload) => {
    try {
      await $http.post('password/new', payload)
    } catch (e) {
      throw e
    } finally {
    }
  },
  [FORGOT_PASSWORD]: async ({ commit }, payload) => {
    try {
      await $http.post('password/forgot', payload)
    } catch (e) {
      throw e
    } finally {
    }
  }
}

const mutations = {
  [SET_USER_BALANCE] (state, balance) {
    state.balance = balance
  },
  [SET_USER_REF_LINK] (state, refLink) {
    state.refLink = refLink
  },
  [SET_USER_DETAIL] (state, userDetail) {
    state.userDetail = userDetail
  },
  [CODE_USER_DETAIL_STATUS] (state, status) {
    state.codeUserDetailStatus = status
  },
  [SET_USER_REFERALS] (state, userReferals) {
    const objReferals = []
    userReferals.map((ex) => {
      ex.profit_stat.map((e) => {
        const obj = {}
        obj.start_date = ex.created_at.substring(0, 10)
        obj.name = ex.username
        obj.profit = (e.referral_profit).toFixed(1) + '₽'
        obj.profitMy = (e.profit).toFixed(1) + '₽'
        obj.sumProfit = (e.referral_profit + e.profit).toFixed(1) + '₽'
        objReferals.push(obj)
      })
    })
    console.log(objReferals)
    state.userReferals = objReferals
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
