import dayjs from 'dayjs'
import { resolve } from 'path'
import pkg from './package.json'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'

/** 路径查找 */
const pathResolve = dir => {
  return resolve(__dirname, '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command)
  console.log(mode)
  const base = mode === 'development' ? '/' : '/admin/'
  return {
    base,
    server: {
      https: false,
      port: 9900,
      host: '0.0.0.0',
      proxy: {}
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [
          // ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep', 'material']
          })
          // ElementPlusResolver()
        ]
      }),
      Icons({
        autoInstall: true
      }),
      svgLoader()
    ],
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@api': pathResolve('src/api'),
        '@images': pathResolve('src/assets/images')
      }
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
