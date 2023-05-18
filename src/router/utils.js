import config from '@/config'

export function setDocumentTitle(to) {
  window.document.title = to.meta.title ? `${config.title}-${to.meta.title}` : `${config.title}`
}
