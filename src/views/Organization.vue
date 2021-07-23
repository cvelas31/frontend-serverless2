<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    {{ name.value }}
    <template #right>
      <router-link
      :to="{name: 'admin-resource-create', params: {resource: name.toLowerCase()}}"
      class="button blue">
      Crear {{ name }}
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <card-component :title="name" :icon="mdiAccountMultiple" has-table>
      <custom-table
        :columnNames="columnNames"
        :tableElements="organizations"
        :columnNamesAttributes="columnNamesAttributes"
        :resource="name.toLowerCase()"
      />
    </card-component>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import {
  mdiMonitorCellphone,
  mdiAccountMultiple,
  mdiTableBorder,
  mdiTableOff
} from '@mdi/js'
import MainSection from '@/components/MainSection'
import CustomTable from '@/components/CustomTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'

export default {
  components: {
    MainSection,
    HeroBar,
    TitleBar,
    CardComponent,
    CustomTable
  },
  setup() {
    const name = ref('Organizacion')
    const titleStack = ref(['Admin', name.value])
    const columnNames = ref(['ID', 'Nombre', 'Subdomain'])
    const columnNamesAttributes = ref(['id', 'name', 'subdomain'])
    const organizations = ref([
      {
        name: '__ALL__',
        admin_user_id: null,
        subdomain: '',
        id: 1
      },
      {
        name: 'FARMAPLAST',
        admin_user_id: null,
        subdomain: 'farmaplast',
        id: 2
      },
      {
        name: 'EXPORTADORA',
        admin_user_id: null,
        subdomain: 'exportadora',
        id: 3
      }
    ])

    return {
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiTableBorder,
      mdiTableOff,
      name,
      organizations,
      columnNames,
      columnNamesAttributes
    }
  }
}
</script>

<style>
</style>
