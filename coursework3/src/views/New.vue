<template>
  <form
    class="card"
    @submit.prevent="submitForm"
  >
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="inputTitle">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="inputDate">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="inputDescr"></textarea>
    </div>

    <button class="btn primary" type="submit" :disabled="isDisabled">Создать</button>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { v4 as generateUUID } from 'uuid'

export default {
  setup () {
    const store = useStore()
    const inputTitle = ref('')
    const inputDate = ref('')
    const inputDescr = ref('')

    function submitForm () {
      if (inputTitle.value.trim() && inputDate.value.trim() && inputDescr.value.trim()) {
        const task = {
          id: generateUUID(),
          title: inputTitle.value,
          deadLine: inputDate.value,
          status: Date.now() > new Date(inputDate.value) ? 'cancelled' : 'active',
          description: inputDescr.value
        }
        store.dispatch('postDataToBack', task)
        inputTitle.value = ''
        inputDate.value = ''
        inputDescr.value = ''
      }
    }

    const isDisabled = computed(() => {
      return !(inputTitle.value.trim() && inputDate.value.trim() && inputDescr.value.trim())
    })

    return {
      submitForm,
      inputDate,
      inputTitle,
      inputDescr,
      isDisabled
    }
  }
}
</script>
