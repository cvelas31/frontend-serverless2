<template>
  <modal-box v-model="isModalActive" title="Por favor confirme la acción" button="red" buttonLabel="Eliminar">
    <p>Esta seguro que desea eliminar <b>{{ name }} {{ id }}</b></p>
  </modal-box>

  <div v-if="checkedRows.length" class="bg-gray-50 p-3">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm"
      >{{ checkedRow.name }}</span
    >
  </div>

  <table>
    <thead>
      <tr>
        <th></th>
        <th v-if="checkable"></th>
        <th v-for="columnName in columnNames" :key="columnName">
          {{ columnName }}
        </th>
        <th>Actualizar</th>
        <th>Eliminar</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tableElement in tableElements" :key="tableElement.id">
        <td></td>
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, tableElement)"
        />
        <td
          v-for="(columnName, index) in columnNames"
          :data-label="columnName"
          :key="columnName"
        >
          {{ tableElement[columnNamesAttributes[index]] }}
        </td>
        <td class="actions-cell" data-label="Actualizar">
          <div class="buttons nowrap">
            <router-link
              class="button green"
              type="button"
              :to="{name: 'admin-resource-view', params: {resource: resource, resourceId: tableElement.id}}"
            >
              <icon :path="mdiEye" size="15" />
            </router-link>
          </div>
        </td>
        <td class="actions-cell" data-label="Eliminar">
          <div class="buttons nowrap">
            <button
              class="button red"
              type="button"
              @click="isModalActive = true"
            >
              <icon :path="mdiTrashCan" size="15" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="buttons">
            <button
              v-for="page in pagesList"
              @click="currentPage = page"
              type="button"
              class="button"
              :class="{ active: page === currentPage }"
              :key="page"
            >
              {{ page + 1 }}
            </button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import axios from 'axios'
import slice from 'lodash/slice'
import remove from 'lodash/remove'
import ModalBox from '@/components/ModalBox'
import Icon from '@/components/Icon'
import CheckboxCell from '@/components/CheckboxCell'

export default {
  name: 'ClientsTable',
  components: {
    ModalBox,
    Icon,
    CheckboxCell
  },
  props: {
    checkable: {
      type: Boolean,
      default: false
    },
    columnNames: {
      type: Array
    },
    columnNamesAttributes: {
      type: Array
    },
    tableElements: {
      type: Array
    },
    resource: {
      type: String,
      default: 'organization'
    }
  },
  setup() {
    const isModalActive = ref(false)

    const isLoading = ref(false)

    const items = ref([])

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const itemsPaginated = computed(() =>
      slice(
        items.value,
        perPage.value * currentPage.value,
        perPage.value * (currentPage.value + 1)
      )
    )

    const numPages = computed(() =>
      Math.ceil(items.value.length / perPage.value)
    )

    const currentPageHuman = computed(() => currentPage.value + 1)

    const pagesList = computed(() => {
      const pagesList = []

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
      }

      return pagesList
    })

    const checked = (isChecked, client) => {
      if (isChecked) {
        checkedRows.value.push(client)
      } else {
        remove(checkedRows.value, row => row.id === client.id)
      }
    }

    const currentValue = (element, index, columnNamesAttributes) => {
      const attibute = columnNamesAttributes[index]
      return element.getAttibute(attibute)
    }
    // Fetch sample data

    isLoading.value = true

    axios
      .get('data-sources/clients.json')
      .then(r => {
        isLoading.value = false
        if (r.data && r.data.data) {
          items.value = r.data.data
        }
      })
      .catch(error => {
        isLoading.value = false
        console.log(error.message)
        // alert(error.message)
      })

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      checked,
      mdiEye,
      mdiTrashCan,
      currentValue
    }
  }
}
</script>
