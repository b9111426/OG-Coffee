export default {
  handOrders(state, res) {
    state.orders = res.data.orders
    state.pagination = res.data.pagination
  }
}
