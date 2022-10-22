import { apiGetCart, apiDeleteCart, apiAddCart } from '@/api'

export default {
  setJello({ commit }) {
    commit('handJello')
  },
  async getCart({ commit }) {
    const res = await apiGetCart()
    commit('handCartData', res)
  },
  async deleteCart(context, id) {
    await apiDeleteCart(id)
  },
  async addCart(context, data) {
    await apiAddCart(data)
  }
}
