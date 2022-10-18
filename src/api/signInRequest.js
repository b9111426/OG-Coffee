import axios from 'axios'
export const signInRequest = (userInfo) =>
  axios.post(`${process.env.VUE_APP_API}admin/signin`, userInfo)
export const signOutRequest = () =>
  axios.post(`${process.env.VUE_APP_API}/logout`)
