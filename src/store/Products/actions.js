import { apiPageRequest } from '@/api'
export default {
  async getProducts({ commit }, page) {
    try {
      const res = await apiPageRequest(page)
      commit('handGetProducts', res)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}
