export default {
  breadcrumb(state) {
    return state.breadcrumb
  },
  loadingState(state) {
    return state.isLoading
  },
  sortState(state) {
    return state.isSortShow
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
  },
  notFound(state) {
    return state.notFound
  }
}
