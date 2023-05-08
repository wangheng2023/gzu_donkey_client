<template>
  <div class="contrainer">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 登录头像 -->
      <div class="avatar_box">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
      </div>
      <!-- 登录表单、添加ref来获取表单实例，用于重置和表单预验证 -->
      <el-form label-width="0px" ref="regform" :rules="rules" :model="regform" class="form_box">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input size="large" v-model="regform.username" placeholder="请输入手机号" prefix-icon="el-icon-user"
            clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input size="large" v-model="regform.pass" placeholder="请输入密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <!-- 二次密码 -->
        <el-form-item prop="checkPass">
          <el-input size="large" v-model="regform.checkPass" placeholder="请再次输入密码" prefix-icon="el-icon-key"
            show-password>
          </el-input>
        </el-form-item>
        <!-- 二维码 -->
        <el-form-item prop="code" style="width: 40%;">
          <el-input size="large" v-model="regform.code" placeholder="请输入验证码"></el-input>
          <div class="codes"><img :src="img" alt=""></div>
          <div class="next" @click="getCode()"><a href="#">看不清？下一张</a></div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="regSubmit('regform')">注册</el-button>
          <el-button type="info" @click="resetForm('regform')">重置</el-button>
        </el-form-item>
        <!-- 文字按钮区 -->
        <el-form-item class="btnword">
          <el-button type="info" text @click="login">去登录</el-button>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regform.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
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
      regform: {
        // 表单基础初始数据
        username: '',
        pass: '',
        checkPass: '',
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
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
      const timestamp = new Date().getTime()
      const res = await this.$axios.get(`/kaptcha?a=${timestamp}`, { responseType: 'blob' })
      this.img = window.URL.createObjectURL(res.data)
    },
    resetForm(regform) {
      this.$refs[regform].resetFields()
    },
    regSubmit(regform) {
      this.$refs[regform].validate((valid) => {
        if (valid) {
          this.gufy()
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login() {
      this.$router.push({ name: 'login' })
    },
    async gufy() {
      const { data: res } = await this.$axios.post('/user/register', {
        username: this.regform.username,
        password: this.regform.checkPass,
        code: this.regform.code
      })
      // console.log(loginform) /hometeacher
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.$router.push({ name: 'login' })
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
    height: 400px;
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
  bottom: 30px;
  width: 100%;
  height: 280px;
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
