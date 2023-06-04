<template>
  <div>
    <div class="main">
      <h3>账号绑定</h3>
      <div class="zhlist">
        <ul>
          <li v-for="(item, index) in zhlist" :key="index">
            <div class="zhitem">
              <div class="left">
                <div v-if="item.number === '暂未绑定'" class="icon el-icon-warning-outline"></div>
                <div v-else class="icon el-icon-circle-check"></div>
                <div style="margin-left: 30px;">
                  <div class="content">
                    {{ item.cate }}
                  </div>
                  {{ item.number }}
                </div>
              </div>
              <div class="btn">
                <el-button @click="openDialog(item.cate)" type="text">{{ item.number === "暂未绑定" ? "绑定" : '修改'
                }}</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机号修改框 -->
    <el-dialog width="30%" title="验证手机号" :visible.sync="outerVisible" @close="resetform('ruleFormRef1')">
      <el-form ref="ruleFormRef1" :model="form" :rules="rules" label-width="100px" status-icon>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.number" disabled />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="12"> <el-input v-model="form.code" /></el-col>
            <el-col :span="4"> <el-button style="margin-left: 10px;" @click="getcode(form.phone)">{{ sendmsg
            }}</el-button></el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-dialog width="30%" title="修改手机号" :visible.sync="innerVisible" append-to-body @close="resetform('ruleFormRef3')">
        <el-form ref="ruleFormRef3" :model="changeform" :rules="rules" label-width="100px" status-icon>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="changeform.phone" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="12"> <el-input v-model="changeform.code" /></el-col>
              <el-col :span="4"> <el-button style="margin-left: 10px;" @click="getcodechange(changeform.phone)">{{ sendmsg
              }}</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="sure(changeform.phone, changeform.code)">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changePhone(form.phone, form.code)">更换手机号</el-button>
      </div>
    </el-dialog>

    <!-- 邮箱修改框 -->
    <el-dialog width="30%" title="验证手机号" :visible.sync="emailouterVisible" @close="resetform('ruleFormRef1')">
      <el-form ref="ruleFormRef1" :model="form" :rules="rules" label-width="100px" status-icon>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.number" disabled />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="12"> <el-input v-model="form.code" /></el-col>
            <el-col :span="4"> <el-button style="margin-left: 10px;" @click="getcode(form.phone)">{{ sendmsg
            }}</el-button></el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-dialog width="30%" title="绑定邮箱" :visible.sync="emailinnerVisible" append-to-body
        @close="resetform('ruleFormRefemail')">
        <el-form ref="ruleFormRefemail" :model="changeform" :rules="rules" label-width="100px" status-icon>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="changeform.email" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="12"> <el-input v-model="changeform.code" /></el-col>
              <el-col :span="4"> <el-button style="margin-left: 10px;" @click="getcodeEmail(changeform.email)">{{ sendmsg
              }}</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="emailsure(changeform.email, changeform.code)">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changePhone(form.phone, form.code)">绑定邮箱</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog width="30%" title="修改密码" :visible.sync="dialogVisible2" @close="resetform('changeform')">
      <el-form label-width="0px" ref="changeform" :rules="rules" :model="form" class="form_box">
        <el-form-item prop="oldpass">
          <el-input size="large" v-model="form.oldpass" placeholder="请输入旧密码" prefix-icon="el-icon-key"
            clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input size="large" v-model="form.pass" placeholder="请输入新密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <!-- 二次密码 -->
        <el-form-item prop="checkPass">
          <el-input size="large" v-model="form.checkPass" placeholder="请再次输入新密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormPass('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.changeform.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      outerVisible: false,
      innerVisible: false,
      emailouterVisible: false,
      emailinnerVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        number: '',
        phone: '', // 修改手机号
        email: '', // 修改邮箱
        oldpass: '',
        pass: '',
        checkPass: '',
        code: ''
      },
      changeform: {
        phone: '',
        email: '',
        code: ''
      },
      sendmsg: '发送验证码',
      noSend: true,
      zhlist: [
        { cate: '手机号', number: '182****7262' },
        { cate: '邮箱', number: '197******@qq.com' },
        { cate: '密码', number: '******' }
      ],
      // 验证规则
      rules: {
        phone: [
          { validator: validateusername, required: true, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, required: true, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', required: true, trigger: ['blur', 'change'] }
        ],
        oldpass: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getuserinfo()
  },
  methods: {
    // 获取用户信息
    async getuserinfo() {
      const { data: res } = await this.$axios.get('/user/getCustomerInfo')
      if (res.code === 200) {
        this.zhlist[0].number = this.geTel(res.data.mobilePhone)
        this.form.number = this.geTel(res.data.mobilePhone)
        this.form.phone = res.data.mobilePhone
        if (res.data.email) {
          this.zhlist[1].number = this.getEmail(res.data.email)
        } else {
          this.zhlist[1].number = '暂未绑定'
        }
      }
    },
    // 隐藏中间4位数字
    geTel(tel) {
      const reg = /^(\d{3})\d{4}(\d{4})$/
      return tel.replace(reg, '$1****$2')
    },
    getEmail(email) {
      const arr = email.split('@')
      // 再拼接起来substring() 方法用于提取字符串中介于两个指定下标之间的字符
      return email.substring(0, 3) + '*****' + '@' + arr[1]
    },
    resetForm(regform) {
      this.$refs[regform].resetFields()
    },
    openDialog(item) {
      if (item === '手机号') { this.outerVisible = true }
      if (item === '邮箱') { this.emailouterVisible = true }
      if (item === '密码') { this.dialogVisible2 = true }
    },
    // 换绑时获取验证码
    async getcodechange(phone) {
      const { data: res } = await this.$axios.get(`/user/checkPhone?phone=${phone}`)
      if (res.code === 200) {
        this.getcode(phone)
      } else {
        this.$message.error('该手机号已被绑定，换一个试试吧！')
      }
    },
    // 绑定邮箱获得验证码
    getcodeEmail(email) {
      this.$axios.get(`/mailCode/sendEmilCode?email=${email}`)
      this.$message.success('发送成功，请注意查收！')
      this.noSend = false
      let timer = 60
      this.sendmsg = timer + 's'
      this.timeFun = setInterval(() => {
        --timer
        this.sendmsg = timer + 's'
        if (timer === 0) {
          this.isSend = true
          this.sendmsg = '重新发送'
          clearInterval(this.timeFun)
        }
      }, 1000)
    },
    // 获得验证码
    async getcode(phone) {
      // this.$refs.ruleFormRef1.validate(async (valid) => {
      //   if (valid) {
      const { data: res } = await this.$axios.get(`/smsCode/sendSmsCode?phone=${phone}`)
      if (res.code === 200) {
        this.$message.success('发送成功，请注意查收！')
        this.noSend = false
        let timer = 60
        this.sendmsg = timer + 's'
        this.timeFun = setInterval(() => {
          --timer
          this.sendmsg = timer + 's'
          if (timer === 0) {
            this.isSend = true
            this.sendmsg = '重新发送'
            clearInterval(this.timeFun)
          }
        }, 1000)
      }
    },
    // 点击修改手机号
    async changePhone(phone, code) {
      const { data: res } = await this.$axios.get(`/smsCode/checkSmsCode?phone=${phone}&code=${code}`)
      if (res.code === 200) {
        clearInterval(this.timeFun)
        this.innerVisible = true
        this.emailinnerVisible = true
        this.sendmsg = '获取验证码'
      } else {
        this.$message.error(res.msg)
      }
    },
    cancel() {
      clearInterval(this.timeFun)
      this.innerVisible = false
      this.outerVisible = false
      this.sendmsg = '获取验证码'
    },
    // 确认更换手机号
    async sure(phone, code) {
      this.$refs.ruleFormRef3.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$axios.get(`/smsCode/checkSmsCode?phone=${phone}&code=${code}`)
          if (res.code === 200) {
            const { data: res1 } = await this.$axios.get(`/user/updatePhone?phone=${phone}`)
            if (res1.code === 200) {
              this.$message.success('换绑成功！')
              this.getuserinfo()
              this.innerVisible = false
              this.outerVisible = false
            }
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 确认绑定邮箱
    emailsure(email, code) {
      this.$refs.ruleFormRefemail.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$axios.get(`/mailCode/checkEmilCode?email=${email}&code=${code}`)
          if (res.code === 200) {
            const { data: res1 } = await this.$axios.get(`/user/updateEmail?email=${email}`)
            if (res1.code === 200) {
              this.$message.success('邮箱绑定成功！')
              this.getuserinfo()
              this.emailinnerVisible = false
              this.emailouterVisible = false
            }
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 修改密码
    submitFormPass() {
      this.$refs.changeform.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$axios.post('/user/updatePassword',
            {
              oldPassword: this.form.oldpass,
              newPassword: this.form.checkPass
            })
          if (res.code === 200) {
            this.$message({ type: 'success', message: res.msg })
            this.dialogVisible2 = false
            this.$router.push({ name: 'index' })
            window.sessionStorage.removeItem('userid')
          } else { this.$message({ type: 'error', message: res.msg }) }
        } else {
          this.$message({ type: 'info', message: '请按要求填写表单' })
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
.zhlist {
  width: 80%;
  height: 400px;
  margin-top: 20px;
  margin-left: 20px;
}

ul li {
  display: inline-block;
  width: 100%;
}

:deep(.el-icon-circle-check:before) {
  color: rgb(16, 233, 95);
  font-weight: 700;
}

.zhitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fafafa;
  margin-bottom: 15px;
  border-radius: 18px;

  .left {
    display: flex;
    justify-content: left;
    align-items: center;

    .icon {
      margin-left: 20px;
    }
  }

  .btn {
    margin-right: 20px;
  }
}
</style>
