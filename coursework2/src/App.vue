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
          >{{ typeOfSelect[item] }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model="text"></textarea>
      </div>
      <button class="btn primary"
              @click.prevent="onAdd(selectedValue, text)"
              :disabled="isBtnDisabled"
      >Добавить
      </button>
    </form>
    <div class="card card-w70">
      <hr/>
      <div v-if="components.length">
        <component v-for="component in components"
                   :key="component.id"
                   :is="component.title"
                   v-bind={content:component.content}
        ></component>
      </div>
      <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
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
import axios from 'axios'

export default {
  data () {
    return {
      typeOfSelect: {
        'app-title': 'Заголовок',
        'app-avatar': 'Аватар',
        'app-subtitle': 'Подзаголовок',
        'app-text': 'Текст'
      },
      selectedValue: 'AppTitle',
      components: [],
      text: '',
      loading: false,
      baseUrl: 'https://vue-course-a990b-default-rtdb.firebaseio.com/data.json',
      comments: {},
      b: ''
    }
  },
  mounted () {
    this.loadComponents()
  },
  methods: {
    async loadComponents () {
      const { data } = await axios.get(this.baseUrl)
      if (data) {
        this.components = Object.keys(data).map(key => {
          return {
            id: data[key].id,
            title: data[key].title,
            content: data[key].content
          }
        })
      }
    },
    onAdd (selectedValue, text) {
      const component = {
        title: selectedValue,
        id: Date.now().toString() + selectedValue,
        content: text
      }
      axios.post(this.baseUrl, component)
        .catch(error => console.error(error))
      this.components.push(component)
      this.text = ''
      this.selectedValue = 'app-title'
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
  components: {
    AppTitle,
    AppAvatar,
    AppSubtitle,
    AppText,
    AppComment
  }
}
</script>

<style>
</style>
