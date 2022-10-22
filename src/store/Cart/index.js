import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    cartData: [],
    jello: false
  },
  actions,
  mutations,
  getters
}
