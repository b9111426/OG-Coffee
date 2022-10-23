import { apiGetCart, apiDeleteCart, apiAddCart } from '@/api'

export default {
  setShake({ commit }) {
    commit('handShake')
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
