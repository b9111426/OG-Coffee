import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    cartData: [],
    isShake: false,
    final_total: 0
  },
  actions,
  mutations,
  getters
}
