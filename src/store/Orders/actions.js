import {
  apiGetOrder,
  apiModifyOrder,
  apiDeleteOrder,
  apiPostOrder,
  apiPayOrder
} from '@/api'
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
  },
  async submitOrder(context, data) {
    const res = await apiPostOrder(data)
    return res
  },
  async getAllOrders(context) {
    let num = 0
    const pages = context.state.pagination.total_pages
    for (let idx = 1; idx <= pages; idx++) {
      const res = await apiGetOrder(idx)
      num += res.data.orders.length
    }
    context.commit('handAllOrders', num)
  },
  async payOrder(context, id) {
    const res = await apiPayOrder(id)
    return res
  }
}
