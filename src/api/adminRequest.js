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

//後台訂單
export const getOrdersRequest = (page) => adminApi.get(`/orders?page=${page}`)

//上傳圖片
export const upLoadRequest = (formData) =>
  adminApi.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
