import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      /* Auth */
      isLoggedIn: false,
      access_token: null,
      token_type: null,

      /* User */
      userName: null,
      userEmail: null,
      userAvatar: null,
      organization_id: null,
      organization_name: null,

      /* FormScreen - fullscreen form layout (e.g. login page) */
      isFormScreen: false,

      /* Aside */
      isAsideMobileExpanded: false
    }
  },
  mutations: {
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    userLogged(state, payload) {
      state.access_token = payload.access_token
      state.token_type = payload.token_type
      state.isLoggedIn = true
    }
  },
  actions: {
    asideMobileToggle({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },
    formScreenToggle({ commit, state }, payload) {
      commit('basic', {
        key: 'isFormScreen',
        value: payload
      })

      document.documentElement.classList[payload ? 'add' : 'remove']('form-screen')
    }
  },
  modules: {
  }
})

export default store
