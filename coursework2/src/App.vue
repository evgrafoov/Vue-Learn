<template>
  <div class="container column">
    <form class="card card-w30">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model="selectedValue">
          <option
            v-for="item in Object.keys(typeOfSelect)"
            :key="item"
            :value="item"
          >{{typeOfSelect[item]}}</option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model="text"></textarea>
      </div>
      <button class="btn primary"
              @click.prevent="onAdd(selectedValue, text)"
              :disabled="isBtnDisabled"
      >Добавить</button>
    </form>
    <div class="card card-w70">
      <hr />
      <component v-for="component in components"
                 :is="component[1][0]"
                 v-bind={content:component[1][1]}
                 :key="component[0]"
      ></component>
      <h3 v-if="!components.size">Добавьте первый блок, чтобы увидеть результат</h3>
    </div>
  </div>
  <div class="container">
    <p>
      <button class="btn primary" @click.prevent="loadComments">Загрузить комментарии</button>
    </p>
    <div class="card" v-if="!loading">
      <h2>Комментарии</h2>
      <app-comment
        v-for="comment in comments"
        :key="comment.id"
        :email="comment.email"
        :content="comment.body"
      ></app-comment>
    </div>
    <div class="loader" v-else></div>
  </div>
</template>

<script>
import AppTitle from './AppTitle'
import AppAvatar from './AppAvatar'
import AppSubtitle from './AppSubtitle'
import AppText from './AppText'
import AppComment from '@/AppComment'

export default {
  data () {
    return {
      typeOfSelect: {
        AppTitle: 'Заголовок',
        AppAvatar: 'Аватар',
        AppSubtitle: 'Подзаголовок',
        AppText: 'Текст'
      },
      selectedValue: 'AppTitle',
      components: new Map(),
      text: '',
      id: 1,
      loading: false,
      comments: {}
    }
  },
  methods: {
    onAdd (selectedValue, text) {
      this.components.set(this.id, [selectedValue, text])
      this.text = ''
      this.id++
      this.selectedValue = 'AppTitle'
    },
    async loadComments () {
      this.loading = true
      const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42', {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      this.comments = await res.json()
      this.loading = false
    }
  },
  computed: {
    isBtnDisabled () {
      return !(this.text.length > 3)
    }
  },
  components: { AppTitle, AppAvatar, AppSubtitle, AppText, AppComment }
}
</script>

<style>
</style>
