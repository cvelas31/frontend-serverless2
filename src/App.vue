<template>
  <nav-bar v-if="isAuthenticated" />
  <aside-menu :menu="menu" v-if="isAuthenticated" />
  <router-view />
  <footer-bar v-if="isAuthenticated" />
</template>

<script>
// @ is an alias to /src
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  mdiDesktopMac,
  mdiTable,
  mdiSquareEditOutline,
  mdiAccountCircle,
  mdiLock,
  mdiViewList,
  mdiHelpCircle,
  mdiGithub
} from '@mdi/js'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'App',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    onBeforeMount(() => {
      // #############################################################
      // https://stackoverflow.com/questions/45571729/how-to-setup-vuex-and-vue-router-to-redirect-when-a-store-value-is-not-set
      // TODO: With the next we get the current subdomain and we can do the proper API calls
      // Additionally it changes the BASE_URL of axios
      const host = window.location.host
      const parts = host.split('.')
      // localhost:8080
      let subdomain = ''
      // Checkin current organization
      const domainLength = 3 // route1.example.com => domain length = 3 regular mode
      if ((parts.length === domainLength) & (parts[0] !== 'www')) {
        subdomain = parts[0]
        // route2.localhost:8080
      } else if ((parts.length === domainLength - 1) & (parts[0] !== 'www')) {
        // Get current subdomain and see if it exists
        subdomain = parts[0]
      }
      store
        .dispatch('organization/getOrganizationInfoFromSubdomain', subdomain)
        .catch((error) => {
          console.error(error)
          router.push('/notfound')
        })
      // #############################################################
      // this.$router.push('/notfound')
    })
    // eslint-disable-next-line
    const isAuthenticated = computed(function () {
      return store.state.auth.status.loggedIn
    })

    const menu = ref([
      'General',
      [
        {
          to: '/',
          icon: mdiDesktopMac,
          label: 'Dashboard'
        }
      ],
      'Admin',
      [
        {
          to: '/tables',
          label: 'Tables',
          icon: mdiTable,
          updateMark: true
        },
        {
          to: '/forms',
          label: 'Forms',
          icon: mdiSquareEditOutline
        },
        {
          to: '/profile',
          label: 'Profile',
          icon: mdiAccountCircle
        },
        {
          to: '/login',
          label: 'Login',
          icon: mdiLock
        },
        {
          label: 'Submenus',
          subLabel: 'Submenus Example',
          icon: mdiViewList,
          menu: [
            {
              href: '#void',
              label: 'Sub-item One'
            },
            {
              href: '#void',
              label: 'Sub-item Two'
            }
          ]
        },
        {
          label: 'Admin',
          subLabel: 'Admin',
          icon: mdiViewList,
          menu: [
            {
              href: '/admin/organization',
              label: 'Organizacion'
            },
            {
              href: '/admin/area',
              label: 'Areas'
            },
            {
              href: '/admin/user',
              label: 'Usuarios'
            },
            {
              href: '/admin/order_template',
              label: 'Plantillas de Ordenes'
            }
          ]
        }
      ],
      'About',
      [
        {
          href: 'https://justboil.me/tailwind-admin-templates',
          label: 'About',
          icon: mdiHelpCircle
        },
        {
          href: 'https://github.com/justboil/admin-one-vue-tailwind',
          label: 'GitHub',
          icon: mdiGithub
        }
      ]
    ])

    return {
      menu,
      isAuthenticated
    }
  }
}
</script>
