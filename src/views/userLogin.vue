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
        <el-form-item prop="username">
          <el-radio v-model="loginform.radio" label="1">我是管理员</el-radio>
          <el-radio v-model="loginform.radio" label="2">我是普通用户</el-radio>
        </el-form-item>
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
        <el-form-item prop="code" style="width: 40%;">
          <el-input size="large" v-model="loginform.code" placeholder="请输入验证码"></el-input>
          <div class="codes"><img :src="img" alt=""></div>
          <div class="next" @click="getCode()"><a href="#">看不清？换一张</a></div>
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
        if (this.loginform.pass !== '') {
          // this.$refs.loginform.validateField('pass')
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
  beforeDestroy() {
    this.getUserInfo()
  },
  methods: {
    async getCode() {
      const timestamp = new Date().getTime()
      const res = await this.$axios.get(`/kaptcha?a=${timestamp}`, { responseType: 'blob' })
      console.log(res.headers)
      console.log(document.cookie)
      this.img = window.URL.createObjectURL(res.data)
    },
    // 一进入页面查看用户是否登录
    async getUserInfo() {
      const { data: res } = await this.$axios.get('user/getCustomerInfo')
      if (res.code === 200) {
        this.userinfo = res.data
        console.log('this.userinfo', res.data)
        window.sessionStorage.setItem('userid', res.data.id)
      }
    },
    toReg() {
      this.$router.push({ name: 'reg' })
    },
    resetForm(loginform) {
      this.$refs[loginform].resetFields()
    },
    login(loginform) {
      this.$refs[loginform].validate(async (valid) => {
        if (valid) {
          // 获取后端反馈
          if (this.loginform.radio === '2') { this.gufy() }
          if (this.loginform.radio === '1') {
            const { data: res } = await this.$axios.post('/admin/login', {
              username: this.loginform.username,
              password: this.loginform.pass,
              code: this.loginform.code
            })
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$router.push({ name: 'homemanager' })
            } else {
              this.$message.error(res.msg)
            }
          }
        }
      })
    },
    async gufy() {
      const { data: res } = await this.$axios.post('user/login', {
        username: this.loginform.username,
        password: this.loginform.pass,
        code: this.loginform.code
      })
      if (res.code !== 200) return this.$message.error(res.msg)
      if (res.code === 200) {
        this.$message.success(res.msg)
        // window.sessionStorage.setItem('userid', res.data.id)
        this.$router.push({ name: 'index' })
        // , query: { id: res.data.id }
      }
    }
  }
}
</script>

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
    height: 380px;
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
  height: 300px;
  padding: 0 30px;

  .codes {
    position: absolute;
    left: 170px;
    top: 0px;
    width: 40%;
    height: 40px;
  }

  .next {
    position: absolute;
    left: 270px;
    top: 0px;
    width: 110px;
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
