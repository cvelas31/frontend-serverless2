import UserService from '../services/user.service'

const initialState = {
  name: null,
  email: null
}

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    getUserInfo({ commit }) {
      const decodedJWT = UserService.decodeJWT()
      return UserService.getUserInfo(decodedJWT.sub).then(
        response => {
          commit('userInfoSucces', response.data)
          return Promise.resolve(response)
        },
        error => {
          commit('userInfoFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    userInfoSucces(state, user) {
      state.name = user.name
      state.email = user.email
    },
    userInfoFailure(state) {
      state.name = null
      state.email = null
    }
  }
}
