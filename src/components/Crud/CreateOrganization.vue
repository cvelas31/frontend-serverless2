<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    Crear {{name}}
    <template #right>
      <router-link @click="$router.go(-1)" class="button light">
        Dashboard
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <card-component :title="'Crear ' + name" :icon="mdiBallot">
  <SchemaForm :schema="schema" >
            <template v-slot:afterForm>
          <BaseButton type="submit" class="button green my-2">Submit</BaseButton>
        </template>
  </SchemaForm>
    </card-component>
  </main-section>
</template>

<script>
import { ref, markRaw } from 'vue'
import { useSchemaForm, SchemaFormFactory } from 'formvuelate'
import FormText from '@/components/Forms/FormText'
import CreateOrganizationParsed from '@/schemas/CreateOrganizationParsed.json'
import BaseButton from '@/components/Forms/BaseButton'
import { mdiBallot } from '@mdi/js'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'

markRaw(FormText)

// Declare FormText and FormSelect as local components
const factory = SchemaFormFactory([], { FormText })

console.log(CreateOrganizationParsed)

export default {
  components: {
    SchemaForm: factory,
    BaseButton,
    MainSection,
    HeroBar,
    CardComponent,
    TitleBar
  },
  setup() {
    const name = ref('Organization')
    const schema = ref(CreateOrganizationParsed)
    const formData = ref({})
    useSchemaForm(formData)

    return {
      schema,
      mdiBallot,
      name
    }
  }
}

</script>

<style>

</style>
