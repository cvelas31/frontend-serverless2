import axios from '../plugins/axios'
import qs from 'qs'
// import formHeader from '../services/form-header'
// const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login(user) {
    console.log('AuthService')
    console.log(user)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json'
    }
    return axios
      .post(
        '/login/access-token',
        qs.stringify({
          username: user.username,
          password: user.password
        }),
        {
          headers: headers
        }
      )
      .then(response => {
        console.log(response)
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
    return axios.post('/signup', {
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
