import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from '@/utils/progress'
import remainingRouter from './modules/remaining'
import { setDocumentTitle } from './utils'

const modules = import.meta.glob(['./modules/**/*.js', '!./modules/**/remaining.js'], {
  eager: true
})

const routes = []

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.concat(remainingRouter)
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  setDocumentTitle(to)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
