import { createApp } from 'vue'
import { store } from '@/store'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import ElementPlus from 'element-plus'

// 引入重置样式
import './styles/reset.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind.css'
// 全局引入element样式
import 'element-plus/dist/index.css'
// 导入公共样式
import './styles/index.scss'

const app = createApp(App)

app.use(MotionPlugin).use(ElementPlus).use(store).use(router).mount('#app')
