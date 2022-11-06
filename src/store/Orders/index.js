import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    orders: [],
    pagination: {},
    tempOrder: {},
    orderInfo: {},
    allOrdersNum: 0
  },
  actions,
  mutations,
  getters
}
