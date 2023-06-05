import config from '@/config'
import router from './index'

export function setDocumentTitle(to) {
  window.document.title = to.meta.title ? `${config.title}-${to.meta.title}` : `${config.title}`
}

export function addPathMatch() {
  if (!router.hasRoute('pathMatch')) {
    router.addRoute({
      path: '/:pathMatch(.*)',
      name: 'pathMatch',
      redirect: '/error/404'
    })
  }
}
