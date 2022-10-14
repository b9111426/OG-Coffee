import { createStore } from 'vuex'

import Products from './Products/index'
import Orders from './Orders/index'
import Coupon from './Coupon/index'
import Cart from './Cart/index'
import Articles from './Articles/index'

import { apiSignInRequest } from '@/api'

export default createStore({
  state: {
    isLoading: false
  },
  actions: {
    handLoading({ commit }, boolean) {
      commit('handLoadState', boolean)
    },
    async signInRequest(context, userInfo) {
      const res = await apiSignInRequest(userInfo)
      return res
    }
  },
  mutations: {
    handLoadState(state, boolean) {
      state.isLoading = boolean
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  },
  modules: {
    Products,
    Orders,
    Coupon,
    Cart,
    Articles
  }
})
