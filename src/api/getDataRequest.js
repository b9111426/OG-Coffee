import axios from 'axios'

export const getDataRequest = (userInfo) =>
  axios.post(`${process.env.VUE_APP_API}admin/signin`, userInfo)
