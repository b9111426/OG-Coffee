export default {
  handSortState(state, boolean) {
    state.isSortShow = boolean
  },
  handSwitchSort(state, boolean) {
    if (boolean) {
      state.tempProducts.sort((a, b) => a.price - b.price)
    } else {
      state.tempProducts.sort((a, b) => b.price - a.price)
    }

    state.products = state.tempProducts.slice(0, 10)
    const totalPage = Math.ceil(state.tempProducts.length / 10)
    state.pagination = {
      total_pages: totalPage,
      current_page: totalPage === 0 ? 0 : 1,
      has_pre: false,
      has_next: totalPage !== 0 ? 1 : 0,
      category: 'search'
    }
  },
  handTempProduct(state, category) {
    if (category === undefined) {
      state.tempProducts = state.allProducts
    } else {
      const ary = state.allProducts.filter((i) => {
        return i.category === category
      })
      state.tempProducts = ary
    }
  },
  handSearchPagination(state, page) {
    if (page > state.pagination.total_pages) {
      state.pagination.current_page = state.pagination.total_pages
    } else {
      state.pagination.current_page = page
    }
    let startPage = (page - 1) * 10
    let endPage = startPage + 10
    state.products = state.tempProducts.slice(startPage, endPage)
    if (
      page === state.pagination.total_pages &&
      state.pagination.total_pages !== 1
    ) {
      state.pagination.has_next = false
      state.pagination.has_pre = true
    } else if (page === 1 && state.pagination.total_pages !== 1) {
      state.pagination.has_next = true
      state.pagination.has_pre = false
    }
  },
  handSubCategory(state, str) {
    const ary = state.allProducts.filter((i) => {
      return i.sub_category.includes(str)
    })
    state.tempProducts = ary
    state.products = ary.slice(0, 10)
    const totalPage = Math.ceil(ary.length / 10)

    state.pagination = {
      total_pages: totalPage,
      current_page: totalPage === 0 ? 0 : 1,
      has_pre: false,
      has_next: totalPage === 1 ? false : true,
      category: 'search'
    }
  },
  handSearchProduct(state, str) {
    const ary = state.allProducts.filter((i) => {
      return i.title.includes(str)
    })
    if (ary.length === 0) {
      state.notFound = str
      state.isSortShow = false
    }
    state.tempProducts = ary
    state.products = ary.slice(0, 10)
    const totalPage = Math.ceil(ary.length / 10)
    state.pagination = {
      total_pages: totalPage,
      current_page: totalPage === 0 ? 0 : 1,
      has_pre: false,
      has_next: totalPage !== 1 ? false : true,
      category: 'search'
    }
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
