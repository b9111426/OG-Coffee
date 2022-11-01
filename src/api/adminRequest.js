import axios from 'axios'

const adminApi = axios.create({
  baseURL: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/`
})
//後台登入
export const checkRequest = (token) => {
  axios.defaults.headers.common.Authorization = token
  adminApi.defaults.headers.common.Authorization = token
  return axios.post(`${process.env.VUE_APP_API}api/user/check`)
}
//後台產品
export const allProductRequest = () => adminApi.get('/products/all')
export const productPageRequest = (page) =>
  adminApi.get(`/products/?page=${page}`)

export const delProductRequest = (id) => adminApi.delete(`/product/${id}`)

export const modifyProductRequest = (id, product) =>
  adminApi.put(`/product/${id}`, { data: product })

export const addProductRequest = (product) =>
  adminApi.post('/product', { data: product })

//後台優惠卷
export const getCouponsRequest = (page) =>
  adminApi.get(`/coupons/?page=${page}`)
export const addCouponsRequest = (coupon) =>
  adminApi.post('/coupon', { data: coupon })
export const modifyCouponsRequest = (id, coupon) =>
  adminApi.put(`/coupon/${id}`, { data: coupon })
export const deleteCouponRequest = (id) => adminApi.delete(`/coupon/${id}`)

//後台訂單
export const getOrdersRequest = (page) => adminApi.get(`/orders/?page=${page}`)
export const modifyOrdersRequest = (id, order) =>
  adminApi.put(`/order/${id}`, { data: order })

export const deleteOrderRequest = (id) => adminApi.delete(`/order/${id}`)

//後台文章
export const getArticlesRequest = (page) =>
  adminApi.get(`/articles/?page=${page}`)
export const modifyArticleRequest = (id, order) =>
  adminApi.put(`/article/${id}`, { data: order })
export const getArticleRequest = (id) => adminApi.get(`/article/${id}`)
export const deleteArticleRequest = (id) => adminApi.delete(`/article/${id}`)
export const addArticleRequest = (article) =>
  adminApi.post('/article', { data: article })

//上傳圖片
export const upLoadRequest = (formData) =>
  adminApi.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
