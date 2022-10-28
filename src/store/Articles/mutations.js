export default {
  handArticles(state, res) {
    state.articles = res.data.articles
    state.pagination = res.data.pagination
  }
}
