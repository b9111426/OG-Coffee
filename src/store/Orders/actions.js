import { apiGetOrder, apiModifyOrder, apiDeleteOrder } from '@/api'
export default {
  async getOrders({ commit }, page) {
    const res = await apiGetOrder(page)
    commit('handOrders', res)
  },
  async modifyOrder(context, data) {
    const { id, order } = data
    const res = await apiModifyOrder(id, order)
    return res
  },
  async deleteOrder(context, id) {
    await apiDeleteOrder(id)
  },
  sendOrderInfo({ commit }, data) {
    commit('handOrderInfo', data)
  }
}
