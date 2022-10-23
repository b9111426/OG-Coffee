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
  },
  category(state) {
    const ary = []
    state.products.forEach((i) => {
      if (ary.indexOf(i.category) === -1) {
        ary.push(i.category)
      }
    })
    const newAry = ary.map((j) => {
      const filter = state.products.filter((x) => {
        return (x.category = j)
      })
      return { category: j, num: filter.length }
    })
    return newAry
  }
}
