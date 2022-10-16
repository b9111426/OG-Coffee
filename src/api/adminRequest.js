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

export const pageRequest = (page) => adminApi.get(`/products/?page=${page}`)

export const deleteRequest = () => {}
