import axios from 'axios'

export const checkRequest = (token) => {
  axios.defaults.headers.common.Authorization = token
  return axios.post(`${process.env.VUE_APP_API}api/user/check`)
}
