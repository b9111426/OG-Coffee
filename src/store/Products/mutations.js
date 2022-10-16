export default {
  handGetProducts(state, res) {
    state.products = res.data.products
    state.pagination = res.data.pagination
  }
}
