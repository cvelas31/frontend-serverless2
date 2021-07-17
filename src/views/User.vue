<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    {{ name.value }}
    <template #right>
      <router-link to="/" class="button blue"> Create {{ name }} </router-link>
    </template>
  </hero-bar>
  <main-section>
    <card-component :title="name" :icon="mdiAccountMultiple" has-table>
      <custom-table
        :columnNames="columnNames"
        :tableElements="organizations"
        :columnNamesAttributes="columnNamesAttributes"
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
    const name = ref('Usuarios')
    const titleStack = ref(['Admin', name.value])
    const columnNames = ref(['ID', 'Nombre', 'Apellido', 'Activo'])
    const columnNamesAttributes = ref(['id', 'name', 'last_name', 'is_active'])
    const organizations = ref([
      {
        name: 'Camilo',
        last_name: 'Velasquez',
        email: 'cvelas31@outlook.com',
        is_active: true,
        organization_id: 1,
        id: '1',
        orders_owned: [],
        areas: [],
        organization: {
          name: '__ALL__',
          admin_user_id: null,
          subdomain: '',
          id: 1
        }
      },
      {
        name: 'Admin',
        last_name: 'Farmaplast',
        email: 'admin-farma@farmaplast.com',
        is_active: true,
        organization_id: 2,
        id: '2',
        orders_owned: [],
        areas: [
          {
            name: 'Admin',
            organization_id: 2,
            id: 1,
            parent_area_id: null,
            children_areas: []
          }
        ],
        organization: {
          name: 'FARMAPLAST',
          admin_user_id: null,
          subdomain: 'farmaplast',
          id: 2
        }
      },
      {
        name: 'Mantenimiento1',
        last_name: 'Farmaplast',
        email: 'mant1-farma@farmaplast.com',
        is_active: true,
        organization_id: 2,
        id: '3',
        orders_owned: [],
        areas: [
          {
            name: 'Mantenimiento',
            organization_id: 2,
            id: 3,
            parent_area_id: null,
            children_areas: []
          }
        ],
        organization: {
          name: 'FARMAPLAST',
          admin_user_id: null,
          subdomain: 'farmaplast',
          id: 2
        }
      },
      {
        name: 'Produccion1',
        last_name: 'Farmaplast',
        email: 'prod1-farma@farmaplast.com',
        is_active: true,
        organization_id: 2,
        id: '4',
        orders_owned: [],
        areas: [
          {
            name: 'Produccion',
            organization_id: 2,
            id: 4,
            parent_area_id: null,
            children_areas: []
          }
        ],
        organization: {
          name: 'FARMAPLAST',
          admin_user_id: null,
          subdomain: 'farmaplast',
          id: 2
        }
      },
      {
        name: 'Taller1',
        last_name: 'Farmaplast',
        email: 'taller1-farma@farmaplast.com',
        is_active: true,
        organization_id: 2,
        id: '5',
        orders_owned: [],
        areas: [
          {
            name: 'Taller',
            organization_id: 2,
            id: 2,
            parent_area_id: null,
            children_areas: []
          }
        ],
        organization: {
          name: 'FARMAPLAST',
          admin_user_id: null,
          subdomain: 'farmaplast',
          id: 2
        }
      },
      {
        name: 'Admin',
        last_name: 'Exportadora',
        email: 'exportadoraexpress@exp.com',
        is_active: true,
        organization_id: 3,
        id: '6',
        orders_owned: [],
        areas: [
          {
            name: 'Admin',
            organization_id: 3,
            id: 5,
            parent_area_id: null,
            children_areas: []
          }
        ],
        organization: {
          name: 'EXPORTADORA',
          admin_user_id: null,
          subdomain: 'exportadora',
          id: 3
        }
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
