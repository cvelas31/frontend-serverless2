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
      <custom-table :columnNames="columnNames" checkable />
    </card-component>

    <card-component is-empty />
  </main-section>
</template>

<script>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
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
    const name = ref('Organization')
    console.log(name.value)
    const titleStack = ref(['Admin', name.value])
    const columnNames = ref(['Columna1', 'Columna2'])

    return {
      name,
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiTableBorder,
      mdiTableOff,
      columnNames
    }
  }
}
</script>

<style>
</style>
