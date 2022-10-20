import axios from 'axios'

const frontApi = axios.create({
  baseURL: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/`
})

export const allFrontProductRequest = () => frontApi.get('/products/all')
export const frontProductRequest = (page) =>
  frontApi.get(`/products/?page=${page}`)
export const singleProductRequest = (id) => frontApi.get(`/product/${id}`)
