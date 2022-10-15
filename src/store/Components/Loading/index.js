export default {
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
  }
}
