import axios from '../plugins/axios'

class OrganizationService {
  getOrganizationIdFromSubdomain(subdomain) {
    if (subdomain !== '') {
      const prevUrl = axios.defaults.baseURL
      const parts = prevUrl.split('//')
      if (parts.lenght > 2) {
        console.error(
          'Url split by // went wrong. Expected 2 parts got' + parts.lenght
        )
      }
      // http://localhost:8080/api/v1
      // http://farmplast.localhost:8080/api/v1
      axios.defaults.baseURL = parts[0] + '//' + subdomain + '.' + parts[1]
    }
    return axios.get('/organizations/subdomain/')
  }
}

export default new OrganizationService()
