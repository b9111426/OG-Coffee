import { apiSignInRequest } from '@/api'

export default {
  state: {},
  actions: {
    async signInRequest(context, userInfo) {
      const res = await apiSignInRequest(userInfo)
      return res
    }
  },
  mutations: {},
  getters: {}
}
