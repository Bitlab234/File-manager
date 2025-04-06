import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import FolderPage from '@/pages/FolderPage.vue'
import FilePage from '@/pages/FilePage.vue' // Добавлен маршрут для просмотра файла

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/:folderName', component: FolderPage, name: 'folder' },
  { path: '/file/:id', component: FilePage, props: true } // Маршрут для файла
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router