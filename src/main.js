import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './css/main.css'
import FormText from './components/Forms/FormText'

/* Default title tag */
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.dispatch('asideMobileToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

const app = createApp(App)

app.component('FormText', FormText)

app
  .use(store)
  .use(router)
  .mount('#app')
