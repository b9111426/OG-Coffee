import { apiGetCart, apiDeleteCart } from '@/api'

export default {
  async getCart({ commit }) {
    const res = await apiGetCart()
    commit('handCartData', res)
  },
  async deleteCart(context, id) {
    await apiDeleteCart(id)
  }
}
