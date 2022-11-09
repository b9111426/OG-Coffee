export default {
  handArticles(state, res) {
    state.articles = res.data.articles
    state.pagination = res.data.pagination
  },
  handAllArticles(state, num) {
    state.allArticlesNum = num
  },
  handFrontArticle(state, res) {
    state.articles = res.data.articles
    state.pagination = res.data.pagination
  }
}
