export default {
  handBreadcrumb(state, str) {
    state.breadcrumb = str
  },
  handLoading(state, boolean) {
    state.isLoading = boolean
  },
  handFrontProducts(state, res) {
    state.products = res.data.products
    state.pagination = res.data.pagination
  },
  handFrontAllProduct(state, res) {
    state.allProducts = res.data.products
  },

  //admin
  handProducts(state, res) {
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
