import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    isLoading: false,
    isLogin: false
  },
  actions: {
    handLoading({ commit }, payload) {
      commit('handLoadState', payload)
    },
    handLogin({ commit }, userInfo) {
      axios
        .post(`${process.env.VUE_APP_API}admin/signin`, userInfo)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          commit('handLoginState', true)
        })
        .catch(() => {})
    }
  },
  mutations: {
    handLoadState(state, boolean) {
      state.isLoading = boolean
    },
    handLoginState(state, boolean) {
      state.isLogin = boolean
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    isLogin(state) {
      return state.isLogin
    }
  }
})
