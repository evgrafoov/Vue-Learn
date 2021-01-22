<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :type="task.status"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.deadLine }}</p>
    <p><strong>Описание</strong>: {{ task.descr }}</p>
    <div>
      <button class="btn" @click.prevent="onChangeStatus('active')">Взять в работу</button>
      <button class="btn primary" @click.prevent="onChangeStatus('done')">Завершить</button>
      <button class="btn danger" @click.prevent="onChangeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { AppStatus },
  props: [],
  setup () {
    const store = useStore()
    const task = ref('')
    onBeforeMount(() => {
      task.value = store.getters.getActiveTask
    })

    function onChangeStatus (newStatus) {
      task.value.status = newStatus
      store.commit('changeStatus', task.value)
      store.dispatch('updateTask', task.value)
    }
    return {
      task,
      onChangeStatus
    }
  }
}
</script>

<style scoped>

</style>
