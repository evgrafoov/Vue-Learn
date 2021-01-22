<template>
  <span :class="['badge', statusClass]">{{ text }}</span>
</template>
<script>

import {
  ref,
  computed
} from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['active', 'done', 'cancelled', 'pending'].indexOf(value) !== -1
      }
    }
  },
  setup (props) {
    const text = ref('')
    const statusClass = computed(() => {
      switch (props.type) {
        case 'active':
          text.value = 'Активен'
          return 'primary'
        case 'done':
          text.value = 'Завершен'
          return 'warning'
        case 'cancelled':
          text.value = 'Отменен'
          return 'warning'
        default:
          text.value = ''
          return 'warning'
      }
    })
    return {
      text,
      statusClass
    }
  }
}
</script>
