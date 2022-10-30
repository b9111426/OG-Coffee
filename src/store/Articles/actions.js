import {
  apiGetArticles,
  apiGetArticle,
  apiDeleteArticle,
  apiModifyArticle,
  apiAddArticle
} from '@/api'

export default {
  async getArticles({ commit }, page) {
    const res = await apiGetArticles(page)
    commit('handArticles', res)
  },
  async getAllArticles(context) {
    let num = 0
    const pages = context.state.pagination.total_pages
    for (let idx = 1; idx <= pages; idx++) {
      const res = await apiGetArticles(idx)
      num += res.data.articles.length
    }
    context.commit('handAllArticles', num)
  },
  async getArticle(context, id) {
    const res = await apiGetArticle(id)
    return res
  },
  async deleteArticle(context, id) {
    const res = apiDeleteArticle(id)
    return res
  },
  async modifyArticle(context, data) {
    const { id, article } = data
    const res = await apiModifyArticle(id, article)
    return res
  },
  async addArticle(context, article) {
    const res = await apiAddArticle(article)
    return res
  }
}
