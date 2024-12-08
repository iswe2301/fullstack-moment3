import { createRouter, createWebHistory } from 'vue-router'
// Importera vyerna som ska användas
import HomeView from '../views/HomeView.vue'
import InfoView from '../views/InfoView.vue'
import DataView from '../views/DataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: HomeView,
    },
    { // Vy för att visa information om vue
      path: '/om-vue',
      name: 'info',
      component: InfoView,
    },
    { // Vy för att visa data för resor
      path: '/resor',
      name: 'data',
      component: DataView,
    }
  ],
})

export default router
