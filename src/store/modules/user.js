import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: ''
  }),
  getters: {},
  actions: {
    setToken(val) {
      this.token = val
    }
  },
  persist: [
    {
      paths: ['token'],
      storage: sessionStorage
    }
  ]
})
