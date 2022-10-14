import axios from 'axios'

export const getDataRequest = (num) => {
  return axios.get(`https://randomuser.me/api/?results=${num}`)
}
