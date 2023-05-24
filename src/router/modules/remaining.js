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
    redirect: (to) => {
      return { path: '/login' }
    }
  },
  { path: '/:pathMatch(.*)*', name: 'pathMatch', redirect: '/error/404' }
]
