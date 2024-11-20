import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import ShowMilhao from '@/views/ShowMilhao.vue'
import Lista from '@/views/Lista.vue'
import Perfil from '@/views/Perfil.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ShowdoMilhao',
    name: 'showdomilhao',
    component: ShowMilhao
  },
  {
    path: '/Lista',
    name: 'lista',
    component: Lista
  },
  {
    path: '/Perfil',
    name: 'perfil',
    component: Perfil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
