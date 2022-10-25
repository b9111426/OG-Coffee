export default {
  ordersData(state) {
    return state.orders
  },
  ordersPage(state) {
    return state.pagination
  },
  paidNum(state) {
    const ary = state.orders.filter((i) => {
      return i.is_paid === true
    })
    return ary.length
  }
}
