import { createStore } from 'vuex'

import Products from './Products/index'
import Orders from './Orders/index'
import Coupon from './Coupon/index'
import Cart from './Cart/index'
import Articles from './Articles/index'
import Components from './Components/index'

export default createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    Products,
    Orders,
    Coupon,
    Cart,
    Articles,
    Components
  }
})
