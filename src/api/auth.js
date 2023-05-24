import request from '@/utils/request'

export const getLoginVerCode = (payload) => {
  return request.get('/Auth/GetLoginVerCode', payload)
}

export const getToken = (payload) => {
  return request.post('/Auth/GetTokenPC', payload)
}
