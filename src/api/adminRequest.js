import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/`
})

export const checkRequest = (token) => {
  axios.defaults.headers.common.Authorization = token
  return axios.post(`${process.env.VUE_APP_API}api/user/check`)
}

export const pageRequest = (page) => instance.get(`/products/?page=${page}`)
