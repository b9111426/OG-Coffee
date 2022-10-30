import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    articles: [],
    pagination: {},
    allArticlesNum: 0
  },
  actions,
  mutations,
  getters
}
