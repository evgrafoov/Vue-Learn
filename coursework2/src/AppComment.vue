<template>
  <ul class="list">
    <li class="list-item">
      <div>
        <p><strong>{{ email }}</strong></p>
        <small>{{ content }}</small>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['email', 'content']
}
</script>

<style scoped>

</style>
