export default {
  handSearchProduct(state, str) {
    const ary = state.allProducts.filter((i) => {
      return i.title.includes(str)
    })
    state.products = ary
  },
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
    //將category做分類
    const categoryAry = []
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
    state.breadcrumb = newAry[0].category
    state.categoryList = newAry
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
