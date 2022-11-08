import { createStore } from 'vuex'

import Products from './Products/index'
import Orders from './Orders/index'
import Coupon from './Coupon/index'
import Cart from './Cart/index'
import Articles from './Articles/index'
import Components from './Components/index'

export default createStore({
  state: {
    toPage: ''
  },
  actions: {
    toPage({ commit }, str) {
      commit('handToPage', str)
    }
  },
  mutations: {
    handToPage(state, str) {
      state.toPage = str
    }
  },
  getters: {
    toPage(state) {
      return state.toPage
    }
  },
  modules: {
    Products,
    Orders,
    Coupon,
    Cart,
    Articles,
    Components
  }
})
