<template>
  <div class="container column">
    <form class="card card-w30">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model="selectedValue">
          <option
            v-for="item in Object.keys(typeOfSelect)"
            :key="typeOfSelect[item]"
            :value="typeOfSelect[item]"
          >{{item}}</option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model="text"></textarea>
      </div>
      <button class="btn primary" @click.prevent="onAdd(selectedValue, text)">Добавить</button>
    </form>
    <div class="card card-w70">
      <hr />
      <component v-for="component in components"
                 :is="component[1][0]"
                 :text="component[1][1]"
                 :key="component[0]"
      ></component>
      <h3 v-if="!components.size">Добавьте первый блок, чтобы увидеть результат</h3>
    </div>
  </div>
  <div class="container">
    <p>
      <button class="btn primary">Загрузить комментарии</button>
    </p>
    <div class="card">
      <h2>Комментарии</h2>
      <ul class="list">
        <li class="list-item">
          <div>
            <p><strong>test@microsoft.com</strong></p>
            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, reiciendis.</small>
          </div>
        </li>
      </ul>
    </div>
    <div class="loader"></div>
  </div>
</template>

<script>
import AppTitle from './AppTitle'
import AppAvatar from './AppAvatar'
import AppSubtitle from './AppSubtitle'
import AppText from './AppText'

export default {
  data () {
    return {
      selectedValue: 'title',
      typeOfSelect: {
        Заголовок: 'app-title',
        Аватар: 'app-avatar',
        Подзаголовок: 'app-subtitle',
        Текст: 'app-text'
      },
      components: new Map(),
      text: '',
      id: 1
    }
  },
  methods: {
    onAdd (selectedValue, text) {
      this.components.set(this.id, [selectedValue, text])
      this.text = ''
      this.id++
    }
  },
  components: { AppTitle, AppAvatar, AppSubtitle, AppText }
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
