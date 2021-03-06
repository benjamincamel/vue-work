import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 0.03 })
}

export function delayToken() {
  return Cookies.set(TokenKey, Cookies.get(TokenKey), { expires: 0.03 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
