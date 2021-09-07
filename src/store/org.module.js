import OrganizationService from '../services/organization.service'

const initialState = {
  id: null,
  subdomain: null,
  logo: null,
  slug: null
}

export const organization = {
  namespaced: true,
  state: initialState,
  actions: {
    getOrganizationInfoFromSubdomain({ commit }, subdomain) {
      return OrganizationService.getOrganizationIdFromSubdomain(subdomain)
        .then(
          response => {
            commit('orgIdFromSubdomainSuccess', response.data)
            return Promise.resolve(response)
          },
          error => {
            commit('orgIdFromSubdomainFailure')
            return Promise.reject(error)
          }
        )
    }
  },
  mutations: {
    orgIdFromSubdomainSuccess(state, organization) {
      state.id = organization.id
    },
    orgIdFromSubdomainFailure(state) {
      state.id = null
    }
  }
}
