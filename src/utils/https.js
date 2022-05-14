import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  REMOVE_TOKEN,
  REFRESH_TOKEN
} from '@/store/mutation-types'

Vue.use(VueAxios, axios)

// for multiple parallel requests
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

export const $http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user_token') || ''}`,
    Accept: 'application/json'
  }
})
$http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('user_token') || ''}`
  return config
})
$http.interceptors.response.use((response) => {
  return response
}, (error) => {
  const originalRequest = error.response.config
  switch (error.response.data.code) {
    case 500: {
      router.push({ name: '/' })
      break
    }
    case 404: {
      router.push({ name: '/' })
      break
    }
    case 401: {
      router.push({ name: '/' })
      break
    }
    default: {
      break
    }
  }
  if (error.response.data.code === 401 && originalRequest.retry === false) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject
        })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return Vue.axios(originalRequest)
      }).catch(error => error)
    }

    originalRequest.retry = true
    isRefreshing = true

    return new Promise((resolve, reject) => {
      $http.post('user/refresh-token', { tokenRefresh: localStorage.getItem('user_token') })
        .then(response => {
          // store.commit(`auth/${SET_TOKEN}`, response.data.access_token)
          store.commit(`auth/${REFRESH_TOKEN}`, response.data.tokenData.token)
          originalRequest.headers.Authorization = `Bearer ${response.data.tokenData.token}`
          processQueue(null, response.data.tokenData.token)
          resolve(Vue.axios(originalRequest))
        })
        .catch((error) => {
          router.push({ name: 'home' })
          store.commit(`auth/${REMOVE_TOKEN}`)
          processQueue(error, null)
          reject(error)
        })
        .then(() => {
          isRefreshing = false
        })
    })
  }
  return Promise.reject(error.response)
}
)

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return $http
    }
  })
}
