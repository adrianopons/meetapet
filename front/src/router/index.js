import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import CadastrarPet from '../views/CadastrarPet.vue'
import ConsultarPet from '../views/ConsultarPet.vue'
import ConsultarPetDisponiveis from '../views/ConsultarPetDisponiveis.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: SignUp
  },
  {
    path: '/petsCadastradosGeral',
    name: 'petsCadastradosGeral',
    component: ConsultarPetDisponiveis
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { name: 'novoPet', path: 'novoPet', component: CadastrarPet },
      { name: 'editarPet', path: 'editarPet', component: CadastrarPet },
      { name: 'petsCadastrados', path: 'petsCadastrados', component: ConsultarPet },
      { name: 'petsCadastradosGeral', path: 'petsCadastradosGeral', component: ConsultarPetDisponiveis }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
