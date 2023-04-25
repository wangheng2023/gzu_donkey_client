<template>
  <div class="contrainer">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 登录头像 -->
      <div class="avatar_box">
        <img src="http://donkey.yuanyexiao.cn/user/image/default/191.png" alt="">
      </div>
      <!-- 登录表单、添加ref来获取表单实例，用于重置和表单预验证 -->
      <el-form label-width="0px" ref="loginform" :rules="rules" :model="loginform" class="form_box">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input size="large" v-model="loginform.username" placeholder="请输入用户名" prefix-icon="el-icon-user"
            clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input size="large" v-model="loginform.pass" placeholder="请输入密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <!-- 角色选择 -->
        <!-- <el-form-item prop="role">
          <el-radio-group v-model="loginform.loginFlag">
            <el-radio label="1" size="large">学生</el-radio>
            <el-radio label="2" size="large">教师</el-radio>
            <el-radio label="3" size="large">管理员</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- 按钮区 -->
        <el-form-item prop="code" style="width: 40%;">
          <el-input size="large" v-model="loginform.code" placeholder="请输入验证码"></el-input>
          <div class="codes"><img :src="img" alt=""></div>
          <div class="next" @click="getCode()"><a href="#">看不清？下一张</a></div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login('loginform')">登录</el-button>
          <el-button type="info" @click="resetForm('loginform')">重置</el-button>
        </el-form-item>
        <!-- 文字按钮区 -->
        <el-form-item class="btnword">
          <el-button type="info" text @click="toReg">去注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (value.length !== 11 || /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+d{8})$/.test(value)) {
        console.log(value.length)
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regform.checkPass !== '') {
          this.$refs.regform.validateField('checkPass')
        }
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      img: '',
      flag: '',
      loginform: {
        // 表单基础初始数据
        username: '',
        pass: '',
        code: ''
      },
      // 验证规则
      rules: {
        username: [
          { validator: validateusername, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    async getCode() {
      const res = await this.$axios.get('/admin/kaptcha', { responseType: 'blob' })
      this.img = window.URL.createObjectURL(res.data)
    },
    toReg() {
      this.$router.push({ name: 'reg' })
    },
    resetForm(loginform) {
      this.$refs[loginform].resetFields()
    },
    async login(loginform) {
      this.$refs[loginform].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // 获取后端反馈
      // const loginform1 = JSON.parse(JSON.stringify(loginform))
      const { data: res } = await this.$axios.post('admin/login', {
        username: this.loginform.username,
        password: this.loginform.password,
        code: this.loginform.code
      })
      // console.log(loginform) /hometeacher
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 登录成功后按需跳转到不同主页
      if (this.loginform.loginFlag === '1') {
        // 存储userid，相当于token
        window.sessionStorage.setItem('studentid', this.loginform.username)
        this.router.push({ path: '/home' }).catch(() => { })
      }
      console.log(res.data)
    }
  }
}
</script>

<!-- <script setup>
import encrypt from '@/utils/encrypt'
import { reactive, getCurrentInstance, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()
const data = reactive({
  flag: proxy.$store.state.wxlogintrigger
})
const loginform = reactive({
  // 表单基础初始数据
  username: '',
  password: '',
  loginFlag: '' - 0
})
function resetloginform() {
  router.push({ path: '/register' }).catch(() => { })
}
async function login() {
  // 获取后端反馈
  // const loginform1 = JSON.parse(JSON.stringify(loginform))
  const { data: res } = await proxy.$axios.post('login', {
    username: loginform.username,
    password: encrypt.Encrypt(loginform.password),
    loginFlag: loginform.loginFlag
  })
  // console.log(loginform) /hometeacher
  if (res.code !== 200) return proxy.$message.error(res.message)
  proxy.$message.success(res.message)
  // 登录成功后按需跳转到不同主页
  if (loginform.loginFlag === '1') {
    // 存储userid，相当于token
    window.sessionStorage.setItem('studentid', loginform.username)
    router.push({ path: '/home' }).catch(() => { })
  } else if (loginform.loginFlag === '2') {
    router.push({ path: '/hometeacher' }).catch(() => { })
    window.sessionStorage.setItem('teacherid', loginform.username)
  } else {
    router.push({ path: '/homemanager' }).catch(() => { })
    window.sessionStorage.setItem('managerid', loginform.username)
  }
  console.log(res.data)
}
async function bind() {
  const { data: res } = await proxy.$axios.post('bind/openid', {
    account: loginform.username,
    pwd: encrypt.Encrypt(loginform.password),
    flag: loginform.loginFlag,
    openid: window.sessionStorage.getItem('openid')
  })
  if (res.code !== 200) {
    proxy.$message.error(res.message)
  } else {
    // proxy.$message.success(res.message)
    login()
  }
}
onMounted(() => {
  data.flag = proxy.$store.state.wxlogintrigger
  console.log(data.flag)
})
onUnmounted(() => {
  proxy.$store.commit('savewxlogintrigger', 1)
})

</script> -->

<style lang="less" scoped>
.contrainer {
  height: 100%;
  background-color: #97badd;

  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 470px;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;

    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgb(212, 208, 208);
      }
    }
  }
}

p {
  margin: 40px auto;
}

.form_box {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 250px;
  padding: 0 30px;

  .codes {
    position: absolute;
    left: 170px;
    top: 0px;
    width: 40%;
    height: 40px;
    background-color: pink;
  }

  .next {
    position: absolute;
    left: 270px;
    top: 0px;
    width: 100px;
    height: 40px;
    margin-left: 20px;
  }

  .el-input__inner {
    height: 40px !important;
  }

  .btn {
    position: relative;
    left: 260px;
  }

  .btnword button {
    margin-top: -65px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
