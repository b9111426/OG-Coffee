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
  async getAllCoupons(context) {
    let num = 0
    const pages = context.state.pagination.total_pages
    for (let idx = 1; idx <= pages; idx++) {
      const res = await apiGetCoupons(idx)
      num += res.data.coupons.length
    }
    context.commit('handAllCoupons', num)
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
    const res = await apiDeleteCoupon(id)
    return res
  }
}
