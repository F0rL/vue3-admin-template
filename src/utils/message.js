import { ElMessage } from 'element-plus'
import { isFunction } from './validate'

/**
 * `Message` 消息提示函数
 */
const message = (message, params) => {
  if (!params) {
    return ElMessage({
      message,
      customClass: 'admin-message'
    })
  } else {
    const {
      icon,
      type = 'info',
      dangerouslyUseHTMLString = false,
      customClass = 'antd',
      duration = 2000,
      showClose = false,
      center = false,
      offset = 20,
      appendTo = document.body,
      grouping = false,
      onClose
    } = params

    return ElMessage({
      message,
      type,
      icon,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      center,
      offset,
      appendTo,
      grouping,
      customClass: customClass === 'antd' ? 'admin-message' : '',
      onClose: () => (isFunction(onClose) ? onClose() : null)
    })
  }
}

/**
 * 关闭所有 `Message` 消息提示函数
 */
const closeAllMessage = () => ElMessage.closeAll()

export { message, closeAllMessage }
