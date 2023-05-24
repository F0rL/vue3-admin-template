<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: {
    ElConfigProvider
  },
  computed: {
    currentLocale() {
      return zhCn
    }
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small'
    }
  }
})
</script>
