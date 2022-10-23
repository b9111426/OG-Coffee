import { apiGetCart, apiDeleteCart, apiAddCart, apiModifyCart } from '@/api'

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
  },
  async modifyCart(context, obj) {
    const { id, data } = obj
    await apiModifyCart(id, { data })
  }
}
