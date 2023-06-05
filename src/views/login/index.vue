<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { getLoginVerCode, getToken } from '@api/auth'
import { message } from '@/utils/message'
import { useUserStore } from '@/store/modules/user'
import md5 from 'md5'

defineOptions({
  name: 'Login'
})

const model = reactive({
  userName: 'SysAdmin0808',
  passWord: '123456',
  verifyCode: '',
  verifyKey: ''
})

const ruleFormRef = ref()
const verifyImage = ref('')
const loading = ref(false)

const onSetVerifyImage = () => {
  getLoginVerCode().then(res => {
    model.verifyKey = res.msg.key
    verifyImage.value = 'data:image/png;base64,' + res.msg.base64
  })
}

const userStore = useUserStore()
const onSubmit = async formEl => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      getToken({
        ...model,
        ...{
          passWord: md5(model.passWord).toUpperCase(),
          verifyCode: md5(model.verifyCode.toUpperCase()).toUpperCase()
        }
      })
        .then(res => {
          userStore.setToken(res.msg)
          message('登录成功', {
            type: 'success'
          })
        })
        .catch(err => {
          onSetVerifyImage()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }) {
  if (code === 'Enter') {
    onSubmit(ruleFormRef.value)
  }
}

onMounted(() => {
  window.document.addEventListener('keypress', onkeypress)
  onSetVerifyImage()
})

onBeforeUnmount(() => {
  window.document.removeEventListener('keypress', onkeypress)
})

const rules = reactive({
  userName: [{ required: true, message: '账号不能为空', trigger: ['blur', 'change'] }],
  passWord: [{ required: true, message: '密码不能为空', trigger: ['blur', 'change'] }],
  verifyCode: [
    { required: true, message: '验证码不能为空', trigger: ['blur', 'change'] },
    { len: 4, message: '验证码长度为4位', trigger: ['blur', 'change'] }
  ]
})
</script>

<template>
  <div class="container select-none">
    <div class="login-container">
      <div
        class="login-box"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100
          }
        }"
      >
        <h4>账号登录</h4>
        <el-form ref="ruleFormRef" :model="model" :rules="rules" size="large">
          <el-form-item prop="userName">
            <el-input v-model="model.userName" clearable>
              <template #prepend>
                <i-ep-user-filled />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="model.passWord" type="password" clearable>
              <template #prepend>
                <i-ep-Lock />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input v-model="model.verifyCode" placeholder="请输入验证码">
              <template #append>
                <img :src="verifyImage" @click="onSetVerifyImage" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="w-full"
              @click="onSubmit(ruleFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  background-image: url(@images/login-bg.jpg);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

h4 {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
}

.login-container {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-box {
  width: 360px;
  right: 160px;
  padding: 20px 25px 0 25px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  flex: 0;
  flex-basis: 100px;
  padding: 0 2px;
  background: #fff;
}
</style>
