import Cookies from 'js-cookie'

export const tokenKey = 'authorized-token'

export function getCookieToken() {
  return Cookies.get(tokenKey)
}

export function setCookieToken(data) {
  return Cookies.set(tokenKey, data)
}
