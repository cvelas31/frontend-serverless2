<template>
  <main-section class="text-center">
    <card-component
      title="Registrarme"
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
              autocomplete="email"
            />
          </control>
        </field>

        <field label="Contraseña" help="Ingrese su contraseña" spaced>
          <control :icon-left="mdiAsterisk" :icon-right="mdiEye" :rightIconMethod="switchVisibilityOriginal">
            <input
              v-model="form.pass"
              class="input"
              :type="passwordFieldTypeOriginal"
              name="password"
              placeholder="Password"
              autocomplete="current-password"
            />
          </control>
        </field>

        <field
          label="Confirmar Contraseña"
          help="Confirme su contraseña"
          spaced
        >
          <control :icon-left="mdiAsterisk" :icon-right="mdiEye" :rightIconMethod="switchVisibility">
            <input
              v-model="form.pass2"
              onpaste="return false;"
              class="input"
              :type="passwordFieldType"
              name="password2"
              placeholder="Password"
              autocomplete="confirmed-password"
            />
          </control>
        </field>

        <divider />

        <field grouped>
          <control>
            <button class="button blue" @click.prevent="login">
              Registrarme
            </button>
          </control>
          <control>
            <router-link to="/" class="button"> Atrás </router-link>
          </control>
        </field>
      </form>
    </card-component>
  </main-section>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccount, mdiAsterisk, mdiLock, mdiEye } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import axios from '../plugins/axios'
import qs from 'qs'

export default {
  name: 'Register',
  components: {
    MainSection,
    CardComponent,
    Field,
    Control,
    Divider
  },
  data() {
    return {
      passwordFieldType: 'password',
      passwordFieldTypeOriginal: 'password'
    }
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
          this.isLoading = false
          this.form.pass = ''
          this.failedLogin = true
          setTimeout(() => {
            this.failedLogin = false
          }, 3000)
        })
      // TODO: Redirect to were it comes from
      this.$router.push('/')
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    switchVisibilityOriginal() {
      this.passwordFieldTypeOriginal =
        this.passwordFieldTypeOriginal === 'password' ? 'text' : 'password'
    }
  },
  setup() {
    const store = useStore()

    store.dispatch('formScreenToggle', true)

    const form = reactive({
      login: '',
      pass: '',
      pass2: ''
    })

    // ref oor reactive?
    const failedLogin = ref(false)

    return {
      form,
      mdiAccount,
      mdiAsterisk,
      mdiLock,
      mdiEye,
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
