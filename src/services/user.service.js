import axios from '../plugins/axios'
import jwtDecode from 'jwt-decode'
import authHeader from './auth-header'

class UserService {
  getPublicContent() {
    return axios.get('all')
  }

  getUserBoard() {
    return axios.get('user', { headers: authHeader() })
  }

  getModeratorBoard() {
    return axios.get('mod', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get('admin', { headers: authHeader() })
  }

  getUserInfo(userId) {
    return axios.get('/users/' + String(userId), { headers: authHeader() })
  }

  decodeJWT() {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.access_token
    return jwtDecode(token)
  }
}

export default new UserService()
