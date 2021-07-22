<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    {{ UpperString(resource) }}
    <template #right>
      <router-link to="/" class="button light"> Dashboard </router-link>
    </template>
  </hero-bar>
  <main-section>
    <card-component
      :title="resource.toUpperCase() + ' ' + resourceId"
      :icon="mdiBallot"
    >
      <SchemaForm :schema="schema">
        <template #afterForm>
          <BaseButton type="submit" class="button blue my-2"
            >Edit</BaseButton
          >
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

export default {
  components: {
    SchemaForm: factory,
    BaseButton,
    MainSection,
    HeroBar,
    CardComponent,
    TitleBar
  },
  props: {
    resource: {
      type: String
    },
    resourceId: {
      type: Number
    }
  },
  setup() {
    const schema = ref(CreateOrganizationParsed)

    const apiData = {
      name: 'Farmaplast',
      subdomain: 'farmaplast'
    }

    const formData = ref(apiData)
    useSchemaForm(formData)

    const UpperString = string => {
      // string example -> String Example
      const arr = string.split(' ')
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      }
      const str2 = arr.join(' ')
      return str2
    }

    return {
      schema,
      mdiBallot,
      UpperString
    }
  }
}
</script>

<style>
</style>
