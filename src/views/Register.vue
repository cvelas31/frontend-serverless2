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
              v-on:blur="validateEmail"
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
          <control
            :icon-left="mdiAsterisk"
            :icon-right="mdiEye"
            :rightIconMethod="switchVisibilityOriginal"
          >
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
          <control
            :icon-left="mdiAsterisk"
            :icon-right="mdiEye"
            :rightIconMethod="switchVisibility"
          >
            <input
              v-on:blur="validate"
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
        <div v-if="showError">
          <p class="justify-center text-red-400">
            Las contraseñas no son iguales
          </p>
        </div>
        <div v-if="showEmailError">
          <p class="justify-center text-red-400">No es un correo valido</p>
        </div>

        <divider />

        <field grouped>
          <control>
            <button class="button blue" @click.prevent="handleRegister">
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
    handleRegister() {
      console.log(this.$store)
      const user = {
        username: this.form.login,
        password: this.form.pass,
        organization_id: this.$store.state.organization.id
      }
      console.log(user)
      if (this.showEmailError) {
        alert('No es un correo valido')
      } else if (this.passwordsDoNotMatch) {
        alert('Las contraseñas no son iguales')
      } else {
        this.loading = true
        this.$store.dispatch('auth/register', user).then(
          () => {
            this.$router.push('/login')
          },
          (error) => {
            this.loading = false
            this.failedMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          }
        )
      }
    },
    // eslint-disable-next-line
    validate: function () {
      this.showError = true
      this.passwordsDoNotMatch = true
      if (this.form.pass === this.form.pass2) {
        this.passwordsDoNotMatch = false
        this.showError = false
      }
    },
    // eslint-disable-next-line
    validateEmail: function () {
      const re = /\S+@\S+\.\S+/
      this.showEmailError = true
      if (re.test(this.form.login)) {
        this.showEmailError = false
      }
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
    const passwordsDoNotMatch = ref(true)
    const showError = ref(false)
    const showEmailError = ref(false)

    // eslint-disable-next-line
    // const doPasswordsMatch = computed(function () {
    //   if (form.pass !== '' && !form.pass === form.pass2) {
    //     passwordsDoNotMatch = true
    //   }
    //   passwordsDoNotMatch = false
    // })

    return {
      form,
      mdiAccount,
      mdiAsterisk,
      mdiLock,
      mdiEye,
      passwordsDoNotMatch,
      showError,
      showEmailError
      // doPasswordsMatch
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
