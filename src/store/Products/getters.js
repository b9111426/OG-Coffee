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
    //const subcategoryAry = []
    state.allProducts.forEach((i) => {
      if (categoryAry.indexOf(i.category) === -1) {
        categoryAry.push(i.category)
      }
    })

    const newAry = categoryAry.map((j) => {
      const filterAry = state.allProducts.filter((x) => {
        return x.category === j
      })
      const ary = []
      const resAry = []
      filterAry.forEach((x) => {
        if (ary.indexOf(x.sub_category) === -1) {
          const obj = {}
          const subAry = state.allProducts.filter((k) => {
            return k.sub_category === x.sub_category
          })

          obj.category = x.sub_category
          obj.num = subAry.length
          ary.push(x.sub_category)
          resAry.push(obj)
        }
      })
      return { category: j, num: filterAry.length, sub_category: resAry }
    })
    console.log(newAry)
    return newAry
  }
}
