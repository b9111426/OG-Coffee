import { apiPageRequest } from '@/api'
export default {
  async getProducts({ commit }, page = 1) {
    try {
      const res = await apiPageRequest(page)
    } catch (err) {
      throw new Error(err)
    }
  }
}
