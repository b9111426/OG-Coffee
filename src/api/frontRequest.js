import axios from 'axios'

const frontApi = axios.create({
  baseURL: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/`
})
//產品
export const allFrontProductRequest = () => frontApi.get('/products/all')
export const singleProductRequest = (id) => frontApi.get(`/product/${id}`)
export const frontProductRequest = (page) =>
  frontApi.get(`/products/?page=${page}`)
export const frontCategoryRequest = (page, category) =>
  frontApi.get(`/products/?page=${page};category=${category}`)

//訂單
export const postOrderRequest = (data) => frontApi.post('/order', data)

//產品優惠卷
export const postCouponRequest = (data) => frontApi.post('/coupon', data)

//購物車

export const getCartRequest = () => frontApi.get('/cart')
export const deleteCartRequest = (id) => frontApi.delete(`/cart/${id}`)
export const addCartRequest = (data) => frontApi.post('/cart', { data })
export const modifyCartRequest = (id, data) => frontApi.put(`/cart/${id}`, data)
