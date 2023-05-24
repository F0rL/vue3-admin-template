import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import ElementPlus from 'element-plus'

// 引入重置样式
import './styles/reset.scss'
// 导入公共样式
import './styles/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind.css'
// 在最后，避免被覆盖
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(MotionPlugin)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
