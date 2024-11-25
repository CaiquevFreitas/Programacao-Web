import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import Cadastro from '@/views/Cadastro.vue'
import ShowMilhao from '@/views/ShowMilhao.vue'
import Lista from '@/views/Lista.vue'
import Perfil from '@/views/Perfil.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/Cadastro',
    name: 'cadastro',
    component: Cadastro
  },
  {
    path: '/ShowdoMilhao',
    name: 'showdomilhao',
    component: ShowMilhao,
    meta: { requiresAuth: true }
  },
  {
    path: '/Lista',
    name: 'lista',
    component: Lista,
    meta: { requiresAuth: true }
  },
  {
    path: '/Perfil',
    name: 'perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.moduloConta.logado){
    alert('Você precisa está logado para acessar essa página')
    return next({path: '/'})
  }
  next();
})

export default router
