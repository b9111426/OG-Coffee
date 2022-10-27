import {
  apiGetCoupons,
  apiAddCoupons,
  apiModifyCoupons,
  apiDeleteCoupon
} from '@/api'
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
  },
  async deleteCoupon(context, id) {
    console.log('yes')
    console.log(id)
    const res = await apiDeleteCoupon(id)
    return res
  }
}
