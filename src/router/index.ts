import { createRouter, createWebHistory, routerKey } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/usuarios',
      name:'usuarios',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/matriculas',
      name:'matriculas',
      component: () => import('../views/MatriculasView.vue')
    },
    {
      path: '/matriculas/criarMatricula',
      name:'criarMatricula',
      component: () => import('../views/CriarMatriculaView.vue')
    },
    {
      path: '/turmas',
      name:'turmas',
      component: () => import('../views/TurmasView.vue')
    }
  ]

})

router.beforeEach(() => {
  
})
export default router
