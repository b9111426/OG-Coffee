export default {
  handGetCoupons(state, res) {
    state.coupons = res.data.coupons
    state.pagination = res.data.pagination
  }
}
