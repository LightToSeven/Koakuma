import { $http } from '@/utils/https'
import {
  REQUEST_UPDATE_STATUS_CART,
  REQUEST_REMOVE_PRODUCT_CART,
  INCREASE_PRODUCT_CART_COUNT,
  DECREASE_PRODUCT_CART_COUNT,
  UPDATE_PRODUCT_CART_COUNT,
  CLEAR_CART,
  ADD_TO_CART,
  UPDATE_ID_ORDER
} from '../mutation-types'
import {
  REQUEST_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  REQUEST_CREAT_ORDER,
  UPDATE_STATUS_CART,
  REQUEST_DISCOUNT
} from '../action-types'

const state = {
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  cartListCount: 0,
  idOrder: JSON.parse(localStorage.getItem('idOrder')) || '',
  statusCart: false
}

const getters = {
  cartList: state => state.cartList,
  idOrder: state => state.idOrder,
  cartListCount: state => state.cartListCount,
  statusCart: state => state.statusCart
}

const actions = {
  [REQUEST_PRODUCT_CART]: async ({ commit }, payload) => {
    try {
      const response = await $http.get(`/products/product/${payload}`)
      commit(ADD_TO_CART, response.data)
      return true
    } catch (e) {
      throw e
    }
  },
  [REQUEST_CREAT_ORDER]: async ({ commit }, payload) => {
    try {
      const response = await $http.post('/orders', payload)
      return response.data
    } catch (e) {
      throw e
    }
  },
  [REQUEST_DISCOUNT]: async ({ commit }, payload) => {
    try {
      console.log(payload)
      const response = await $http.get(`/discounts/exists?code=${payload}`)
      return response.data
    } catch (e) {
      throw e
    }
  },
  [REMOVE_PRODUCT_CART]: async ({ commit }, payload) => {
    commit(REQUEST_REMOVE_PRODUCT_CART, payload)
  },
  [UPDATE_STATUS_CART]: async ({ commit }) => {
    commit(REQUEST_UPDATE_STATUS_CART)
  }
}

const mutations = {
  [ADD_TO_CART] (state, product) {
    const cartItem = state.cartList.find(item => item.id === product.id)
    if (cartItem) {
      cartItem.quantity++
    } else {
      product.quantity = 1
      state.cartList.push(product)
    }
    updateProductCartCount()
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [CLEAR_CART] (state) {
    state.cartList = []
    updateProductCartCount()
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [REQUEST_REMOVE_PRODUCT_CART] (state, id) {
    const cartList = state.cartList.filter(item => item.id !== id)
    state.cartList = cartList
    updateProductCartCount()
    localStorage.setItem('cartList', JSON.stringify(cartList))
  },
  [REQUEST_UPDATE_STATUS_CART] (state) {
    state.statusCart = !state.statusCart
  },
  [INCREASE_PRODUCT_CART_COUNT] (state, id) {
    const cartItem = state.cartList.find(item => item.id === id)
    cartItem && cartItem.quantity++
    updateProductCartCount()
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [DECREASE_PRODUCT_CART_COUNT] (state, id) {
    const cartItem = state.cartList.find(item => item.id === id)
    cartItem && cartItem.quantity--
    updateProductCartCount()
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [UPDATE_PRODUCT_CART_COUNT] (state) {
    updateProductCartCount()
  },
  [UPDATE_ID_ORDER] (state, id) {
    state.idOrder = id
    localStorage.setItem('idOrder', JSON.stringify(id))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

function updateProductCartCount () {
  let count = 0
  state.cartList.map(item => { count += item.quantity })
  state.cartListCount = count
}
