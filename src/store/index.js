import { createStore } from 'vuex'

import Products from './Products/index'
import Orders from './Orders/index'
import Coupon from './Coupon/index'
import Cart from './Cart/index'
import Articles from './Articles/index'

export default createStore({
  state: {
    isLoading: false
  },
  actions: {
    handLoading({ commit }, boolean) {
      commit('handLoadState', boolean)
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
