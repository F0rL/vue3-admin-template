import { defineStore } from 'pinia'
import { getMenuList } from '@api/sysMenu'

export const useUserStore = defineStore('user', {
  state: () => ({
    menuList: []
  }),
  getters: {},
  actions: {
    async getMenuList() {
      const data = await getMenuList()
    }
  }
})
