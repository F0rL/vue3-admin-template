import axios from 'axios'
import { message } from '@/utils/message'
import { parse, stringify } from 'qs'
import config from '@/config'
import routers from '@/router/index'
import cloneDeep from 'lodash/cloneDeep'

// 获取原始类型
export function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
// 移出null的参数
function clearEmptyParam(config) {
  const newConfig = cloneDeep(config)
  const arr = ['data', 'params']
  arr.forEach(item => {
    if (newConfig[item]) {
      const keys = Object.keys(newConfig[item])
      if (keys.length) {
        keys.forEach(key => {
          const rawType = toRawType(newConfig[item])
          if ([null].includes(newConfig[item][key]) && ['Object'].includes(rawType)) {
            delete newConfig[item][key]
          }
        })
      }
    }
  })
  return newConfig
}

//
function getToken() {
  return '1111'
}

let loadingInstance

const openLoading = () => {
  const length = document.getElementsByClassName('el-message').length
  if (length === 0) {
    loadingInstance = Vue.prototype.$baseLoading()
  }
}
const closeLoading = () => {
  if (loadingInstance) {
    setTimeout(() => {
      loadingInstance.close()
    }, 800)
  }
}

const request = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
      encode: parse,
      serialize: stringify
    }
  },
  baseURL: config.baseUrl
})

request.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + getToken()
    config = clearEmptyParam(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  res => {
    console.log(res)
    if (res.data.flag) {
      return Promise.resolve(res.data)
    } else {
      if (res.data.code === 401) {
        removeToken()
      } else {
        const msg = typeof res.data.msg === 'string' ? res.data.msg : JSON.stringify(res.data.msg)
        message(msg, {
          type: 'error'
        })
      }
      return Promise.reject(res.data)
    }
  },
  error => {
    console.log(error)
    const code = error.response.status
    if (code === 401) {
      routers.push({
        name: 'login'
      })
    }
    return Promise.reject(error)
  }
)

const http = {
  post(url, data, options) {
    return request({
      url: url,
      data: data,
      method: 'post'
    })
  },
  get(url, data, options) {
    return request({
      url: url,
      params: data,
      method: 'get'
    })
  }
}

export default http
