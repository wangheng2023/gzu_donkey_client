<template>
  <div>
    <div class="main">
      <h3>账号绑定</h3>
      <div class="zhlist">
        <ul>
          <li v-for="(item, index) in zhlist" :key="index">
            <div class="zhitem">
              <div class="left">
                <div class="icon el-icon-circle-check"></div>
                <div style="margin-left: 30px;">
                  <div class="content">
                    {{ item.cate }}
                  </div>
                  {{ item.number }}
                </div>
              </div>
              <div class="btn">
                <el-button @click="openDialog(item.cate)" type="text">修改</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机号修改框 -->
    <el-dialog title="验证手机号" :visible.sync="outerVisible" @close="resetform('ruleFormRef1')">
      <el-form ref="ruleFormRef1" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="6"> <el-input v-model="form.code" /></el-col>
            <el-col :span="6"> <el-button style="margin-left: 10px;" @click="getcode">{{ sendmsg }}</el-button></el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-dialog width="30%" title="修改手机号" :visible.sync="innerVisible" append-to-body @close="resetform('ruleFormRef3')">
        <el-form ref="ruleFormRef3" :model="changeform" :rules="rules" label-width="120px" status-icon>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="changeform.phone" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="12"> <el-input v-model="changeform.code" /></el-col>
              <el-col :span="4"> <el-button style="margin-left: 10px;" @click="getcode">{{ sendmsg }}</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="sure">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changePhone">更换手机号</el-button>
      </div>
    </el-dialog>

    <!-- 邮箱修改框 -->
    <el-dialog :visible.sync="dialogVisible1" title="修改" width="50%" @close="resetform('ruleFormRef2')">
      <el-form ref="ruleFormRef2" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="邮箱" prop="title">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="sureadd">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog width="30%" title="修改密码" :visible.sync="dialogVisible2" @close="resetform3">
      <el-form label-width="0px" ref="regform" :rules="rules" :model="form" class="form_box">
        <el-form-item prop="oldpass">
          <el-input size="large" v-model="form.oldpass" placeholder="请输入旧密码" prefix-icon="iconfont icon-yewuquanxian"
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
    return {
      outerVisible: false,
      innerVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        phone: '', // 修改手机号
        email: '', // 修改邮箱
        oldpass: '',
        pass: '',
        checkPass: '',
        code: ''
      },
      changeform: {
        phone: '',
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
        ]
      }
    }
  },
  methods: {
    resetForm(regform) {
      this.$refs[regform].resetFields()
    },
    openDialog(item) {
      if (item === '手机号') { this.outerVisible = true }
      if (item === '邮箱') { this.dialogVisible1 = true }
      if (item === '密码') { this.dialogVisible2 = true }
    },
    getcode() {
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
    changePhone() {
      clearInterval(this.timeFun)
      this.innerVisible = true
      this.sendmsg = '获取验证码'
    },
    cancel() {
      clearInterval(this.timeFun)
      this.innerVisible = false
      this.outerVisible = false
      this.sendmsg = '获取验证码'
    },
    sure() {
      this.$message.success('换绑成功！')
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
