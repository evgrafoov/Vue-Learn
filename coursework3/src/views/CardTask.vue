<template>
  <div class="card">
    <h2 class="card-title">
      {{ task.title }}
      <app-status :type="task.status"></app-status>
    </h2>
    <p>
      <strong>
        <small>
          {{task.deadLine}}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click.prevent="$emit('showTask', task)">Посмотреть</button>
  </div>
</template>

<script>
import AppStatus from '@/components/AppStatus'
export default {
  components: { AppStatus },
  props: ['task'],
  emits: ['showTask']
}
</script>
