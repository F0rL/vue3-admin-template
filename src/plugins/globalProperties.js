import { message } from '@/utils/message'

const globalProperties = {
  install(app, options) {
    app.config.globalProperties.$message = message
  }
}

export default globalProperties
