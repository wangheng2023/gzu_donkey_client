<template>
  <div>
    <div class="infobox">
      <el-form label-position="top" ref="ruleForm" :rules="rules" label-width="80px" :model="form">
        <el-form-item label="头像">
          <div class="tx">
            <div class="avatar"><img :src="img" alt=""></div>
            <div class="btn">
              <el-button type="primary" plain size="mini" @click="getSJimg">随 机</el-button>
              <twoUploadSmall @uploadSuccess="uploadPicSuccess"></twoUploadSmall>
            </div>
          </div>
        </el-form-item>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="校区" prop="userCampus">
              <el-select v-model="form.userCampus" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学院" prop="departmentInfoId">
              <el-select v-model="form.departmentInfoId" placeholder="请选择" clearable>
                <el-option v-for="item in optionsDepart" :key="item.departmentCampus" :label="item.departmentName"
                  :value="item.departmentCampus">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="身份" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio :label="1">学生</el-radio>
                <el-radio :label="2">教师</el-radio>
                <el-radio :label="3">其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="个人简介" prop="signature">
              <el-input v-model="form.signature" type="textarea" placeholder="请输入内容" maxlength="30"
                show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import twoUploadSmall from './twoUploadSmall.vue'
export default {
  components: {
    twoUploadSmall
  },
  data() {
    return {
      img: '',
      userinfo: {},
      form: {
        nickName: '',
        signature: '',
        userCampus: '',
        departmentInfoId: '',
        role: '',
        gender: 0
      },
      options: [
        { id: 1, name: '北校区' },
        { id: 2, name: '西校区' },
        { id: 3, name: '东校区' },
        { id: 4, name: '南校区' }],
      optionsDepart: [],
      dialogImageUrl: '', // 选中的某张图片的 url
      uploadQiniuUrl: 'https://upload.qiniup.com', // 七牛云服务器地址
      qiniuData: { // 上传图片携带的参数
        token: '',
        key: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userCampus: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        departmentInfoId: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
    this.getDepartInfo()
  },
  methods: {
    // 一进入页面获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/user/getCustomerInfo')
      if (res.code === 200) {
        this.form = res.data
        this.img = res.data.imageUrl
        console.log('this.form', res.data)
      }
    },
    // 获得学院信息
    async getDepartInfo() {
      const { data: res } = await this.$axios.get('department/allDepartment')
      if (res.code === 200) {
        this.optionsDepart = res.data
      }
    },
    // 获得随机头像
    async getSJimg() {
      const { data: res } = await this.$axios.get('user/randomImageUrl')
      if (res.code === 200) {
        this.img = res.imageUrl
      }
    },
    // 确认修改
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$axios.post('/user/update', this.form)
          if (res.code === 200) {
            this.$message({ type: 'success', message: res.msg })
          } else {
            this.$message({ type: 'error', message: res.msg })
          }
        }
        // else {
        //   this.$message({ type: 'info', message: '表单未填写完整' })
        // }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获得用户自定义头像
    uploadPicSuccess(picList) {
      // TODO 处理业务逻辑
      this.$nextTick(async () => {
        this.img = picList[picList.length - 1].url
        const { data: res } = await this.$axios.get(`user/updateImageUrl?imageUrl=${this.img}`)
        if (res.code === 200) {
          this.$message({ type: 'success', message: res.msg })
        }
        console.log(picList[picList.length - 1].url)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.infobox {
  margin-left: 50px;
}

.tx {
  display: flex;
  justify-content: left;

  .btn {
    margin-left: 20px;

    .el-button {
      transform: scale(0.7)
    }
  }
}

.avatar {
  width: 80px;
  height: 80px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50px;

  }
}
</style>
