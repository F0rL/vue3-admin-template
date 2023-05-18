import HomeView from '@/views/HomeView.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      showLink: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' }
  },
  { path: '/:pathMatch(.*)*', name: 'pathMatch', redirect: '/error/404' }
]
