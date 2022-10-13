import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false
  },
  actions: {
    handLoading(context, payload) {
      context.commit('handLoadState', payload)
    }
  },
  mutations: {
    handLoadState(state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  }
})
