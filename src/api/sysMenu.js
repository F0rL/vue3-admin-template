import request from '@/utils/request'

export const getMenuList = payload => {
  return request.post('/SysMenu/GetMenuList', payload)
}
