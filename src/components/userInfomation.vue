<template>
  <div>
    <section>
      <div id="infodesc" class="infodesc">
        <el-descriptions class="margin-top" title="个人信息" :column="3" border>
          <template slot="extra">
            <el-button type="danger" size="small" @click="outerVisible = true"><label style="color:#fff"
                for="">修改</label></el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="iconfont icon-nicheng"></i>
              昵称
            </template>
            带刺的玫瑰
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="iconfont icon-xingbie"></i>
              性别
            </template>
            <el-tag size="small">保密</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="iconfont icon-ziwojieshao"></i>
              自我介绍
            </template>
            江苏省苏州市吴中区吴中大道 1188 号
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </section>
    <el-dialog title="修改个人信息" :visible.sync="outerVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="手机号即为用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自我介绍" prop="desc">
          <el-input maxlength="30" show-word-limit type="textarea" placeholder="请输入自我介绍"
            v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog width="30%" title="修改密码" :visible.sync="innerVisible" append-to-body>
        <el-form label-width="0px" ref="regform" :rules="rules" :model="regform" class="form_box">
          <el-form-item prop="oldpass">
            <el-input size="large" v-model="regform.oldpass" placeholder="请输入旧密码" prefix-icon="iconfont icon-yewuquanxian"
              clearable></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="pass">
            <el-input size="large" v-model="regform.pass" placeholder="请输入新密码" prefix-icon="el-icon-key" show-password>
            </el-input>
          </el-form-item>
          <!-- 二次密码 -->
          <el-form-item prop="checkPass">
            <el-input size="large" v-model="regform.checkPass" placeholder="请再次输入新密码" prefix-icon="el-icon-key"
              show-password>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">修改密码</el-button>
      </div>
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
    return {
      outerVisible: false,
      innerVisible: false,
      ruleForm: {
        username: '',
        nickname: '',
        sex: '',
        desc: ''
      },
      regform: {
        // 表单基础初始数据
        oldpass: '',
        pass: '',
        checkPass: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, validator: validateusername, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择', trigger: 'change' }
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
  methods: {
    changeuserinfo() { }
  }
}
</script>
<style lang="less" scoped>
.infodesc {
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
