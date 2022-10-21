import { apiGetCart } from '@/api'

export default {
  async getCart({ commit }) {
    const res = await apiGetCart()
    commit('handCartData', res)
  }
}
