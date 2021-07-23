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
    const name = ref('Area')
    const titleStack = ref(['Admin', name.value])
    const columnNames = ref(['ID', 'Nombre'])
    const columnNamesAttributes = ref(['id', 'name'])
    const organizations = ref([
      {
        name: 'Admin',
        organization_id: 2,
        id: 1,
        parent_area_id: null,
        children_areas: []
      },
      {
        name: 'Taller',
        organization_id: 2,
        id: 2,
        parent_area_id: null,
        children_areas: []
      },
      {
        name: 'Mantenimiento',
        organization_id: 2,
        id: 3,
        parent_area_id: null,
        children_areas: []
      },
      {
        name: 'Produccion',
        organization_id: 2,
        id: 4,
        parent_area_id: null,
        children_areas: []
      },
      {
        name: 'Admin',
        organization_id: 3,
        id: 5,
        parent_area_id: null,
        children_areas: []
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
