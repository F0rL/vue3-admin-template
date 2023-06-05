<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const onClick = () => {
  userStore.setToken(2131231)
}
</script>

<template>
  <div class="container">欢迎页</div>
  <div>{{ userStore.token }}</div>
  <div>{{ token }}</div>
  <el-button @click="onClick">点击</el-button>
</template>

<style scoped></style>
