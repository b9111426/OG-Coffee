import {
  apiProductPage,
  apiDelProduct,
  apiUpLoad,
  apiModifyProduct,
  apiAddProduct
} from '@/api'

export default {
  async getProducts({ commit }, page) {
    try {
      const res = await apiProductPage(page)
      commit('handGetProducts', res)
      return res
    } catch (err) {
      throw new Error(err)
    }
  },

  async delProduct(context, id) {
    try {
      const res = await apiDelProduct(id)
      return res
    } catch (err) {
      throw new Error(err)
    }
  },
  async upLoadFile(context, formData) {
    try {
      const res = await apiUpLoad(formData)
      return res
    } catch (err) {
      throw new Error(err)
    }
  },

  async modifyProduct(context, id) {
    try {
      const res = await apiModifyProduct(id)
      return res
    } catch (err) {
      throw new Error(err)
    }
  },
  async addProduct(context, product) {
    try {
      const res = await apiAddProduct(product)
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}
