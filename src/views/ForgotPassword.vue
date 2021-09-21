<template>
  <div class="justify-center">
    <main-section class="text-center justify-center">
      <card-component
        title="Recuperar contraseña"
        :icon="mdiLock"
        class="w-11/12 md:w-5/12 shadow-2xl rounded-lg"
      >
        <div v-if="!emailSent">
          <form method="get">
            <field
              label="Email"
              help="Ingrese el email para recibir el correo de recuperación"
              spaced
            >
              <control :icon-left="mdiAccount">
                <input
                  v-model="form.email"
                  ref="emailRef"
                  class="input"
                  type="text"
                  name="login"
                  placeholder="user@example.com"
                  autocomplete="username"
                />
              </control>
            </field>

            <divider />
            <field grouped>
              <control>
                <div
                  class="blue"
                  :class="
                    isLoading ? 'button cursor-wait' : 'button cursor-pointer'
                  "
                  @click.prevent="handleSendMail"
                >
                  Enviar Correo
                </div>
              </control>
              <control>
                <router-link to="/login" class="button border-4"
                  >Atrás</router-link
                >
              </control>
            </field>
          </form>
        </div>
        <!--v-if="emailSent"-->
        <div v-else>
          <div>
            <p class="justify-center text">
              Correo de recuperación de contraseña enviado a
              <strong>{{ form.email }}</strong
              >.
              <br />
              Siga el link que se le envio al correo.
            </p>
          </div>
          <divider />
          <control>
            <router-link to="/login" class="button">Atrás</router-link>
          </control>
        </div>
        <div>
          <router-link
            to="/register"
            class="no-underline hover:underline text-blue-600 text-sm"
            >Aun no estoy registrado. Registrarme</router-link
          >
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
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'

export default {
  name: 'ForgotPassword',
  components: {
    MainSection,
    CardComponent,
    Field,
    Control,
    Divider
  },
  methods: {
    handleSendMail() {
      const email = this.form.email

      if (this.loading === true) {
        return
      }

      this.loading = true
      this.emailSent = false
      this.$store.dispatch('auth/resetPassword', email).then(
        () => {
          this.loading = false
          this.emailSent = true
        },
        (error) => {
          this.emailSent = false
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
  computed: {
    isLoading() {
      return this.loading
    }
  },
  setup() {
    const store = useStore()

    store.dispatch('formScreenToggle', true)

    const form = reactive({
      email: ''
    })

    // ref oor reactive?
    const emailSent = ref(false)
    const failedMessage = ref('')
    const loading = ref(false)

    return {
      form,
      mdiAccount,
      mdiAsterisk,
      mdiLock,
      emailSent,
      failedMessage,
      loading
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
