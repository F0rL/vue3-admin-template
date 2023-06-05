import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from '@/utils/progress'
import remainingRouter from './modules/remaining'
import { setDocumentTitle } from './utils'
import { useUserStore } from '@/store/modules/user'
import { isErrorPath } from '@/utils/validate'

const modules = import.meta.glob(['./modules/**/*.js', '!./modules/**/remaining.js'], {
  eager: true
})

const routes = []

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default)
})

const constantMenus = routes.flat(Infinity)
console.log(constantMenus)
console.log(remainingRouter)

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.concat(remainingRouter)
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  setDocumentTitle(to)
  if (whiteList.includes(to.path) || isErrorPath(to.path)) {
    next()
  } else {
    const userStore = useUserStore()
    if (!userStore.token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
