const Layout = () => import('@/layout/index.vue')

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
    name: 'Home',
    component: Layout,
    redirect: to => {
      return { path: '/welcome' }
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: {}
      }
    ]
  }
]
