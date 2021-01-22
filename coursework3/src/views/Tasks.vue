<template>
  <h1 class="text-white center" v-if="arrTasks.length === 0">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ $store.getters.getCountActiveTasks }}</h3>
    <card-task
      v-for="task in arrTasks"
      :key="task.id"
      :task="task"
      @showTask="onClickShow"
    ></card-task>
  </div>
</template>
<script>

import { ref, onBeforeMount } from 'vue'
import CardTask from '@/views/CardTask'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: { CardTask },
  setup () {
    onBeforeMount(() => {
      store.dispatch('getDataFromBack')
      setTimeout(() => {
        arrTasks.value = store.getters.getArrTasks
      }, 500)
    })
    const store = useStore()
    const router = useRouter()
    const arrTasks = ref('')

    function onClickShow (task) {
      store.commit('setActiveTask', task)
      router.push('/task/' + task.id)
    }
    return {
      arrTasks,
      onClickShow
    }
  }
}
</script>
