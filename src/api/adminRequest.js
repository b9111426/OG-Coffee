import axios from 'axios'

export const getAdminProducts = () => {
  axios.get('https://randomuser.me/api/?results=30')
}
