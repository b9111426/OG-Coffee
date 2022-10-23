export default {
  breadcrumb(state) {
    return state.breadcrumb
  },
  loadingState(state) {
    return state.isLoading
  },
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
