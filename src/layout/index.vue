<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="app-wrapper">
    <span>sideBar</span>
    <router-view #default="{ Component }">
      <transition :name="route?.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped></style>
