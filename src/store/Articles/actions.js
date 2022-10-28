import { apiGetArticles } from '@/api'

export default {
  async getArticles({ commit }, page) {
    const res = await apiGetArticles(page)
    commit('handArticles', res)
  }
}
