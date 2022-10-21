import {
  apiFrontProduct,
  apiSingleProduct,
  apiAllFrontProduct,
  apiProductPage,
  apiDelProduct,
  apiUpLoad,
  apiModifyProduct,
  apiAddProduct,
  apiAllProduct
} from '@/api'

export default {
  setLoading({ commit }, boolean) {
    commit('handLoading', boolean)
  },
  async getFrontProducts({ commit }, page) {
    const res = await apiFrontProduct(page)
    commit('handFrontProducts', res)
  },
  async getFrontAllProduct({ commit }) {
    const res = await apiAllFrontProduct()
    commit('handFrontAllProduct', res)
  },
  async getSingleProduct(context, id) {
    const res = await apiSingleProduct(id)
    return res
  },

  //admin
  async getProducts({ commit }, page) {
    const res = await apiProductPage(page)
    commit('handProducts', res)
  },
  async getAllProducts({ commit }) {
    const res = await apiAllProduct()
    commit('handAllProducts', res)
  },

  async delProduct(context, id) {
    const res = await apiDelProduct(id)
    return res
  },
  async upLoadFile(context, formData) {
    const res = await apiUpLoad(formData)
    return res
  },

  async modifyProduct(context, data) {
    const { id, product } = data
    const res = await apiModifyProduct(id, product)
    return res
  },
  async addProduct(context, product) {
    const res = await apiAddProduct(product)
    return res
  }
}
