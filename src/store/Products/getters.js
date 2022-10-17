export default {
  productsData(state) {
    return state.products
  },
  productsPage(state) {
    return state.pagination
  },
  allProductNum(state) {
    return state.allProducts.length
  },
  allEnabled(state) {
    const ary = state.allProducts.filter((i) => {
      return i.is_enabled === true
    })
    return ary.length
  }
}
