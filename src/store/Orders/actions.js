import { apiGetOrder } from '@/api'
export default {
  async getOrders({ commit }, page) {
    const res = await apiGetOrder(page)
    commit('handOrders', res)
  }
}
