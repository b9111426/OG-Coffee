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
  allProductsData(state) {
    return state.allProducts
  },
  category(state) {
    return state.categoryList
  }
}
