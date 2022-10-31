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
    const categoryAry = []
    const classObj = {}
    //const subcategoryAry = []
    state.allProducts.forEach((i) => {
      if (categoryAry.indexOf(i.category) === -1) {
        categoryAry.push(i.category)
      }
    })

    const newAry = categoryAry.map((j, idx) => {
      const filterAry = state.allProducts.filter((x) => {
        return x.category === j
      })
      const ary = []
      classObj[idx] = filterAry
      filterAry.forEach((x) => {
        if (ary.indexOf(x.sub_category) === -1) {
          ary.push(x.sub_category)
        }
      })
      return { category: j, num: filterAry.length, sub_category: ary }
    })
    console.log(newAry)
    return newAry
  }
}
