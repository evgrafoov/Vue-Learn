import { createStore } from 'vuex'
import { getData, pushTask, putData } from '@/shared/shared'

export default createStore({
  state () {
    return {
      tasks: [],
      activeTask: ''
    }
  },
  getters: {
    getArrTasks (state) {
      return state.tasks
    },
    getActiveTask (state) {
      return state.activeTask
    },
    getCountActiveTasks (state) {
      return state.tasks
        .filter(item => item.status === 'active')
        .length
    }
  },
  mutations: {
    replaceTasks (state, payload) {
      if (payload) {
        state.tasks = payload
      }
    },
    addToTasks (state, payload) {
      if (payload) {
        state.tasks.push(payload)
      }
    },
    changeStatus (state, payload) {
      if (payload) {
        state.tasks.map(item => {
          if (item === payload) {
            item.status = payload.status
          }
          return item
        })
      }
    },
    setActiveTask (state, payload) {
      if (payload) {
        state.activeTask = payload
      }
    }
  },
  actions: {
    async getDataFromBack ({ commit }) {
      const res = await getData()
      commit('replaceTasks', res)
    },
    async postDataToBack ({ commit }, payload) {
      await pushTask(payload)
      commit('addToTasks', payload)
    },
    async updateTask ({ commit }, payload) {
      await putData(payload)
      const res = await getData()
      commit('replaceTasks', res)
    }
  }
})
