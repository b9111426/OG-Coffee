import axios from 'axios'

let authorize = null
axios.defaults.headers.common.Authorization = authorize

const adminApi = axios.create({
  baseURL: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/`
})

export const checkRequest = (token) => {
  axios.defaults.headers.common.Authorization = token
  adminApi.defaults.headers.common.Authorization = token
  return axios.post(`${process.env.VUE_APP_API}api/user/check`)
}

export const productPageRequest = (page) =>
  adminApi.get(`/products/?page=${page}`)

export const delProductRequest = (id) => adminApi.delete(`/product/${id}`)

export const upLoadRequest = (formData) =>
  adminApi.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const modifyProductRequest = (id) => adminApi.put(`/product/${id}`)

export const addProductRequest = (product) =>
  adminApi.post('/product', { data: product })
