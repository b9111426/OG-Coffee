export default {
  handGetCoupons(state, res) {
    state.coupons = res.data.coupons
    state.pagination = res.data.pagination
    state.total_pages = res.data.pagination.total_pages
  },
  handAllCoupons(state, num) {
    state.allCouponsNum = num
  }
}
