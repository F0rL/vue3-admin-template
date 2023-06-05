export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isErrorPath(val) {
  return /^\/error\//.test(val)
}
