import { defineStore } from 'pinia'
import { setStorageToken, getStorageToken } from '@/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getStorageToken()
  }),
  getters: {},
  actions: {
    setToken(val) {
      this.token = val
      setStorageToken(val)
    }
  }
})
