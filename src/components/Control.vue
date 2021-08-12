<template>
  <component
    :is="is"
    class="control"
    :class="{
      upload: upload,
      expanded: expanded,
      'icons-left': iconLeft,
      'icons-right': iconRight,
    }"
  >
    <slot />
    <control-icon v-if="iconLeft" :icon="iconLeft" />
    <control-icon
      v-if="iconRight"
      :icon="iconRight"
      :class="rightIconClass"
      is-right
      @click.prevent="rightIconMethod"
    />
  </component>
</template>

<script>
import { computed } from 'vue'
import ControlIcon from '@/components/ControlIcon'

export default {
  name: 'Control',
  components: {
    ControlIcon
  },
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String
    },
    iconRight: {
      type: String
    },
    rightIconClass: {
      type: String,
      default: 'cursor-pointer'
    },
    rightIconMethod: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    const is = computed(() => {
      return props.upload ? 'label' : 'div'
    })

    return { is }
  }
}
</script>
