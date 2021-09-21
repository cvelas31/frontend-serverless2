import axios from '../plugins/axios'
import qs from 'qs'
// import formHeader from '../services/form-header'
// const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login(user) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json'
    }
    return axios
      .post(
        '/login/access-token',
        qs.stringify({
          username: user.username, // Email
          password: user.password
        }),
        {
          headers: headers
        }
      )
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post('/users/register/', {
      email: user.username,
      password: user.password,
      organization_id: user.organization_id
    })
  }

  resetPassword(email) {
    return axios.post(`/password-recovery/${email}`)
  }
}

export default new AuthService()
