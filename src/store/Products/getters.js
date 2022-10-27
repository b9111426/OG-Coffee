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
    const ary = []
    state.allProducts.forEach((i) => {
      if (ary.indexOf(i.category) === -1) {
        ary.push(i.category)
      }
    })
    const newAry = ary.map((j) => {
      const filter = state.allProducts.filter((x) => {
        return x.category === j
      })
      return { category: j, num: filter.length }
    })
    return newAry
  }
}
