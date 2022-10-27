import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    coupons: [],
    pagination: {},
    total_pages: null,
    allCouponsNum: 0
  },
  actions,
  mutations,
  getters
}
