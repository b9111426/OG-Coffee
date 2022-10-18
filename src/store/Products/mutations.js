export default {
  handGetProducts(state, res) {
    state.products = res.data.products
    state.pagination = res.data.pagination
  },
  handAllProducts(state, res) {
    const ary = []
    Object.keys(res.data.products).forEach((i) => {
      ary.push(res.data.products[i])
    })
    state.allProducts = ary
  }
}
