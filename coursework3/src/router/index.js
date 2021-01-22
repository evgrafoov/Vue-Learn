import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks'
import Task from '@/views/Task'
import TheNavbar from '@/components/TheNavbar'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: TheNavbar,
      children: [
        {
          path: '',
          component: Tasks
        },
        {
          path: '/task/:id',
          component: Task
        },
        {
          path: '/new',
          component: () => import('../views/New')
        }
      ]
    }],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
