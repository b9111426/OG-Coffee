import axios from 'axios'
//import { getAdminProducts } from './adminRequest.js'
//export const apiGetAdminProducts = getAdminProducts
export const apiGetData = () => {
  axios.get('https://randomuser.me/api/?results=30')
}
