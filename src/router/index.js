import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import store from '../store/index'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      middleware: 'auth'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Tables',
      middleware: 'auth'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables')
  },
  {
    meta: {
      title: 'Forms',
      middleware: 'auth'
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms')
  },
  {
    meta: {
      title: 'Profile',
      middleware: 'auth'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Register')
  },
  {
    meta: {
      title: 'Organization'
    },
    path: '/admin/organization',
    name: 'admin-organization',
    component: () => import(/* webpackChunkName: "login" */ '../views/Organization')
  },
  {
    meta: {
      title: 'Area'
    },
    path: '/admin/area',
    name: 'admin-area',
    component: () => import(/* webpackChunkName: "login" */ '../views/Area')
  },
  {
    meta: {
      title: 'User'
    },
    path: '/admin/user',
    name: 'admin-user',
    component: () => import(/* webpackChunkName: "login" */ '../views/User')
  },
  {
    meta: {
      title: 'OrderTemplate'
    },
    path: '/admin/order_template',
    name: 'admin-order-template',
    component: () => import(/* webpackChunkName: "login" */ '../views/OrderTemplate')
  },
  {
    meta: {
      title: 'CrearOrganizacion'
    },
    path: '/admin/organization/create',
    name: 'admin-organization-create',
    component: () => import(/* webpackChunkName: "login" */ '../components/Crud/CreateOrganization')
  },
  {
    meta: {
      title: 'ViewResource'
    },
    path: '/admin/:resource/:resourceId',
    name: 'admin-resource-view',
    component: () => import(/* webpackChunkName: "login" */ '../components/Crud/View'),
    props: true
  },
  {
    meta: {
      title: 'CreateResource'
    },
    path: '/admin/:resource/create',
    name: 'admin-resource-create',
    component: () => import(/* webpackChunkName: "login" */ '../components/Crud/Create'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`../middleware/${to.meta.middleware}`)
    if (middleware) {
      middleware.default(next, store)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
