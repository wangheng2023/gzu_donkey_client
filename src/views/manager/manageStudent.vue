<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/managestudent' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-row :gutter="10">
          <!-- 搜索框 -->
          <el-col :span="3">
            <el-input placeholder="请输入昵称" size="large" v-model="searchobj.nickName" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchobj.campus" clearable placeholder="请选择校区">
              <el-option label="北校区" value=1></el-option>
              <el-option label="西校区" value=2></el-option>
              <el-option label="东校区" value=3></el-option>
              <el-option label="南校区" value=4></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="searchobj.departmentId" clearable placeholder="请选择学院">
              <el-option v-for="item in options" :key="item.value" :label="item.departmentName"
                :value="item.departmentCampus">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchobj.status" clearable placeholder="请选择身份">
              <el-option label="学生" value="1"></el-option>
              <el-option label="员工" value="2"></el-option>
              <el-option label="校外人员" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表单内容 -->
      <el-table :data="studentlist" style="width: 100%" height="450">
        <el-table-column type="index" width="70" />
        <el-table-column prop="mobilePhone" label="手机号" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="userCampus" label="校区">
          <template #default="scope">
            <span v-if="scope.row.userCampus === 1">北校区</span>
            <span v-if="scope.row.userCampus === 2">西校区</span>
            <span v-if="scope.row.userCampus === 3">东校区</span>
            <span v-if="scope.row.userCampus === 4">南校区</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.gender === 1">男</el-tag>
            <el-tag type="success" v-if="scope.row.gender === 2">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="学院">
        </el-table-column>
        <el-table-column prop="userStatus" label="身份">
          <template #default="scope">
            <span v-if="scope.row.userStatus === 1">学生</span>
            <span v-if="scope.row.userStatus === 2">员工</span>
            <span v-if="scope.row.userStatus === 3">外校人员</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      academyId: '',
      studentlist: [
        { username: 1235, nickname: 'dbfh', phone: 12564, gender: '男', decri: 'dazvf' }
      ],
      classlist: [],
      searchobj: {},
      searchobjfirst: { nickName: '', departmentId: 0, campus: 0, status: 0 },
      options: [],
      addstudentform: {
      }, // 添加学生信息
      academylist: [],
      editstudentlist: {}, // 获取要修改的学生信息
      rules: {
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        studentAccount: [
          { required: true, message: '请输入学生学号', trigger: 'blur' }
        ],
        academyId: [
          { required: true, message: '请输入学生所在院系', trigger: 'blur' }
        ],
        classId: [
          { required: true, message: '请输入学生班级', trigger: 'blur' }
        ],
        studentGender: [
          { required: true, message: '请输入学生性别', trigger: 'blur' }
        ],
        studentPhone: [
          { required: true, message: '请输入学生电话号码', trigger: 'blur' }
        ],
        studentPwd: [
          { required: true, message: '请输入学生密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getstudentlist()
    this.getacademy()
  },
  methods: {
    // 重置添加表单信息
    resetaddform() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 重置修改表单信息
    resetform() {
      this.$refs.ruleeditRef.resetFields()
    },
    // 获取所有用户信息列表
    async getstudentlist() {
      const { data: res } = await this.$axios.post('/admin/searchUser', this.searchobjfirst)
      if (res.code !== 200) { return this.$message.error(res.message) } else if (res.code === 200) {
        this.studentlist = res.data
        console.log(this.studentlist)
      }
    },
    // 模糊查找
    async search() {
      const { data: res } = await this.$axios.post('/admin/searchUser', {
        nickName: this.searchobj.nickName || '',
        departmentId: this.searchobj.departmentId - 0 || 0,
        campus: this.searchobj.campus - 0 || 0,
        status: this.searchobj.status - 0 || 0
      })
      if (res.code !== 200) { return this.$message.error(res.message) } else if (res.code === 200) {
        this.studentlist = res.data
      }
    },
    // 点击添加学生按钮
    addstudent() {
      this.dialogVisible = true
    },
    // 点击确定添加学生按钮
    async sureaddstudent() {
      this.$refs.ruleFormRef.validate(async valid => {
        if (!valid) { this.$message.error('请检查表单填写是否规范') } else {
          const { data: res } = await this.$axios.post('admin/student', {
            studentName: this.addstudentform.studentName,
            classId: this.addstudentform.classId,
            academyId: this.addstudentform.academyId,
            studentGender: this.addstudentform.studentGender,
            studentPhone: this.addstudentform.studentPhone,
            studentAccount: this.addstudentform.studentAccount
          })
          if (res.code !== 200) { return this.$message.error(res.message) } else {
            this.$message.success(res.message)
            this.dialogVisible = false
            this.getstudentlist()
          }
        }
      })
    },
    // 点击确定修改按钮
    async sureedit() {
      this.$refs.ruleeditRef.validate(async valid => {
        if (!valid) { this.$message.error('请检查表单填写是否规范') } else {
          const { data: res } = await this.$axios.put('admin/student', {
            studentId: this.$store.state.studentid,
            classId: this.editstudentlist.classId,
            academyId: this.editstudentlist.academyId,
            studentName: this.editstudentlist.studentName,
            studentGender: this.editstudentlist.studentGender,
            studentPhone: this.editstudentlist.studentPhone,
            studentAccount: this.editstudentlist.studentAccount
          })
          if (res.code !== 200) { this.$message.error(res.message) } else {
            this.$message.success(res.message)
            this.getstudentlist()
            this.dialogVisible1 = false
          }
        }
      })
    },
    // 根据学院获取对应班级列表
    async getacademy() {
      const { data: res } = await this.$axios.get('/department/allDepartment')
      if (res.code !== 200) { return this.$message.error(res.message) } else {
        this.options = res.data
        console.log(this.options)
      }
    },
    // 点击删除按钮
    myDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.delete('admin/student', { params: { studentId: row.studentId } })
        if (res.code !== 200) { return this.$message.error(res.message) } else {
          this.getstudentlist()
          this.$message({ type: 'success', message: '删除成功!' })
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }
  }
}
</script>ri
<style lang="less" scoped>
.header {
  margin-bottom: 15px;
}
</style>
