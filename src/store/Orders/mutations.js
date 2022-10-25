export default {
  handOrders(state, res) {
    console.log(res)
    state.orders = res.data.orders
    state.pagination = res.data.pagination
  }
}
