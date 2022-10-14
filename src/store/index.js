import { createStore } from 'vuex'
export default createStore({
  state: {
    isLoading: false,
    isLogin: false
  },
  actions: {
    handLoading({ commit }, boolean) {
      commit('handLoadState', boolean)
    }
    //handGetData({ commit }, padload) {
    //  apiGetData(padload).then((res) => {
    //    console.log(res.data.results)
    //    commit()
    //  })
    //}
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
})
