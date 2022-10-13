import { createStore } from 'vuex'
//import { apiGetAdminProducts } from '../api'
import { apiGetData } from '../api/index'

export default createStore({
  state: {
    isLoading: false,
    products: [],
    pagination: {}
  },
  actions: {
    handLoading({ commit }, payload) {
      commit('handLoadState', payload)
    },
    handAdminProducts() {
      apiGetData().then((res) => console.log(res.data))
    }
  },
  mutations: {
    handLoadState(state, boolean) {
      state.isLoading = boolean
    }
    //handAdminProductsState(state, data) {
    //  state.products = data
    //  //state.pagination = data.pagination
    //}
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
    //getAdminProducts(state) {
    //  return state.products
    //}
  }
})
