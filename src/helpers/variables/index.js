import store from '@/store'
import {
  SHOW_GLOBAL_LOADER,
  FIX_BODY
} from '@/store/mutation-types'

export function globalLoader (state) {
  store.commit(`system/${SHOW_GLOBAL_LOADER}`, state)
}

export function fixBody (state) {
  store.commit(`system/${FIX_BODY}`, state)
}

export const isMobile = {
  Android: function () {
    return !!navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return !!navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Windows: function () {
    return !!navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows())
  }
}
export const isIPad = {
  iOS: function () {
    return !!navigator.userAgent.match(/iPad|iPod/i)
  }
}
