export default {
  handSearchPagination(state, page) {
    if (page > state.pagination.total_pages) {
      state.pagination.current_page = state.pagination.total_pages
    } else {
      state.pagination.current_page = page
    }
    let startPage = (page - 1) * 10
    let endPage = startPage + 10
    state.products = state.searchAllProducts.slice(startPage, endPage)
    if (page === state.pagination.total_pages) {
      state.pagination.has_next = false
      state.pagination.has_pre = true
    } else if (page === 1) {
      state.pagination.has_next = true
      state.pagination.has_pre = false
    }
  },
  handSubCategory(state, str) {
    const ary = state.allProducts.filter((i) => {
      return i.sub_category.includes(str)
    })
    state.searchAllProducts = ary
    state.products = ary.slice(0, 10)
    const totalPage = Math.ceil(ary.length / 10)
    const currentPage = 1

    state.pagination = {
      total_pages: totalPage,
      current_page: currentPage,
      has_pre: currentPage !== 1,
      has_next: totalPage > currentPage,
      category: 'search'
    }
  },
  handSearchProduct(state, str) {
    const ary = state.allProducts.filter((i) => {
      return i.title.includes(str)
    })
    state.searchAllProducts = ary
    state.products = ary.slice(0, 10)
    const totalPage = Math.ceil(ary.length / 10)
    const currentPage = 1

    state.pagination = {
      total_pages: totalPage,
      current_page: currentPage,
      has_pre: currentPage !== 1,
      has_next: totalPage > currentPage,
      category: 'search'
    }
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
