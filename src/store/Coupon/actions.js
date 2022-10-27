import { apiGetCoupons, apiAddCoupons, apiModifyCoupons } from '@/api'
export default {
  async getCoupons({ commit }, page) {
    const res = await apiGetCoupons(page)
    commit('handGetCoupons', res)
  },
  async modifyCoupon(context, data) {
    const { id, coupon } = data
    const res = await apiModifyCoupons(id, coupon)
    return res
  },
  async addCoupon(context, coupon) {
    const res = await apiAddCoupons(coupon)
    return res
  }
}
