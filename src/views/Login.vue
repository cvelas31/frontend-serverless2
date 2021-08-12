<template>
  <div class="justify-center">
    <main-section class="text-center justify-center">
      <card-component
        title="Login"
        :icon="mdiLock"
        class="w-11/12 md:w-5/12 shadow-2xl rounded-lg"
      >
        <form method="get">
          <field label="Email" help="Ingrese su email" spaced>
            <control :icon-left="mdiAccount">
              <input
                v-model="form.login"
                ref="emailRef"
                class="input"
                type="text"
                name="login"
                placeholder="user@example.com"
                autocomplete="username"
              />
            </control>
          </field>

          <field label="Contraseña" help="Ingrese su contraseña" spaced>
            <control :icon-left="mdiAsterisk">
              <input
                v-model="form.pass"
                class="input"
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="current-password"
              />
            </control>
          </field>

          <check-radio-picker
            name="remember"
            v-model="form.remember"
            :options="{ remember: 'Recordarme' }"
            spaced
          />
          <div v-if="failedLogin">
            <p class="justify-center text-red-400 font-bold">Fallo el Login</p>
          </div>
          <divider />

          <field grouped>
            <control>
              <button class="button blue" @click.prevent="login">Login</button>
            </control>
            <control>
              <router-link to="/" class="button"> Atrás </router-link>
            </control>
          </field>
        </form>
        <div>
          <router-link
            to="/register"
            class="no-underline hover:underline text-blue-600 text-sm"
          >
            Aun no estoy registrado. Registrarme
          </router-link>
        </div>
      </card-component>
    </main-section>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccount, mdiAsterisk, mdiLock } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import axios from '../plugins/axios'
import qs from 'qs'

export default {
  name: 'Login',
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Field,
    Control,
    Divider
  },
  methods: {
    async login() {
      this.isLoading = true
      const data = {
        username: this.form.login,
        password: this.form.pass
      }
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json'
      }
      await axios
        .post('/login/access-token', qs.stringify(data), {
          headers: headers
        })
        .then(response => {
          this.form.login = ''
          this.form.pass = ''
          this.isLoading = false
          this.$store.commit('userLogged', response.data)
        })
        .catch(e => {
          console.log(e)
          this.isLoading = false
          this.form.pass = ''
          this.failedLogin = true
          setTimeout(() => {
            this.failedLogin = false
          }, 3000)
        })
      // TODO: Redirect to were it comes from
      this.$router.push('/')
    }
  },
  setup() {
    const store = useStore()

    store.dispatch('formScreenToggle', true)

    const form = reactive({
      login: '',
      pass: '',
      remember: ['remember']
    })

    // ref oor reactive?
    const failedLogin = ref(false)

    return {
      form,
      mdiAccount,
      mdiAsterisk,
      mdiLock,
      failedLogin
    }
  },
  mounted() {
    const store = useStore()
    this.$refs.emailRef.focus()
    store.dispatch('formScreenToggle', true)
  },
  unmounted() {
    const store = useStore()

    store.dispatch('formScreenToggle', false)
  }
}
</script>
