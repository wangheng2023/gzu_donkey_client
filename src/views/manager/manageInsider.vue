<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight" style="margin-bottom: 10px;">
      <el-breadcrumb-item :to="{ path: '/manageinsider' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限分配</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button size="mini" type="primary" plain @click="addadmin">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表单内容 -->
      <el-table :data="adminlist" style="width: 100%" height="500">
        <el-table-column type="index" width="70" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="permissionsList" label="功能">
          <template #default="scope">
            <el-tag v-for="(item, index) in scope.row.permissionsList " :key="index" style="margin-right: 5px;">
              {{ item ? item.name : null }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button size="mini" type="warning" icon="el-icon-edit" @click="permission(scope.row)">
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="myDelete(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 角色分配的对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="角色分配" width="50%" @close="resetform">
      <el-form ref="ruleeditRef" :model="rolepermission" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="用户名" prop="title">
          <el-input v-model="rolepermission.userName" />
        </el-form-item>
        <el-form-item label="权限" prop="title">
          <el-select @change="getfunbyrole" v-model="rolepermission.permissionsIdList" multiple placeholder="请选择">
            <el-option v-for="item in roleoptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="surepermission">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加管理员对话框 -->
    <el-dialog :visible.sync="dialogVisible1" title="添加管理员" width="50%" @close="resetaddform">
      <el-form ref="ruleFormRef" :model="addform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="用户名" prop="title">
          <el-input v-model="addform.userName" />
        </el-form-item>
        <el-form-item label="权限" prop="title">
          <el-select @change="getfunbyrole" v-model="addform.permissionsIdList" multiple placeholder="请选择">
            <el-option v-for="item in roleoptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="sureadd">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      adminlist: [],
      rolepermission: {},
      funcions: [],
      addform: {},
      roleoptions: [{ value: 1, label: '超级管理员' }, { value: 2, label: '一般管理员' }],
      options: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
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
    this.getadminlist()
    this.getAllfun()
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
    // 获取所有管理员信息列表
    async getadminlist() {
      const { data: res } = await this.$axios.get('/admin/allAdmin')
      if (res.code !== 200) { return this.$message.error(res.message) } else if (res.code === 200) {
        this.adminlist = res.data
        console.log(this.adminlist)
      }
    },
    // 获得所有权限信息
    async getAllfun() {
      const { data: res } = await this.$axios.get('/admin/allPermissions')
      if (res.code === 200) {
        this.roleoptions = res.data
        console.log('this.roleoptions', this.roleoptions)
      }
    },
    // 点击添加学生按钮
    addAdmin() {
      this.dialogVisible1 = true
    },
    // 确定添加
    async sureadd() {
      const { data: res } = await this.$axios.post('/admin/addAdmin', this.addform)
      if (res.code !== 200) { return this.$message.error(res.message) } else {
        this.getadminlist()
        this.$message({ type: 'success', message: '添加成功!' })
        this.dialogVisible1 = false
      }
    },
    // 点击删除按钮
    myDelete(row) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.get(`/admin/deleteAdmin?adminId=${row.id}`)
        if (res.code !== 200) { return this.$message.error(res.message) } else {
          this.getadminlist()
          this.$message({ type: 'success', message: '删除成功!' })
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 确认修改权限
    async surepermission() {
      const { data: res } = await this.$axios.post('/admin/updateAdmin', {
        adminId: this.rolepermission.adminId,
        permissionsIdList: this.rolepermission.permissionsIdList
      })
      if (res.code === 200) {
        this.$message.success('修改权限成功')
        this.getadminlist()
        this.dialogVisible = false
      }
    },
    // 权限分配
    async permission(row) {
      console.log(row)
      this.rolepermission.adminId = row.id
      this.rolepermission.userName = row.userName
      this.rolepermission.permissionsIdList = row.permissionsIdList
      this.dialogVisible = true
    },
    // 根据角色获得功能
    async getfunbyrole(val) {
      console.log(val)
      this.$forceUpdate()
    },
    getFunction() {
      console.log(22)
    },
    // 添加管理员
    addadmin() {
      this.dialogVisible1 = true
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  margin-bottom: 15px;
}

:deep(.el-icon-delete:before) {
  color: #fff;
}

:deep(.el-icon-edit:before) {
  color: #fff;
}

:deep(.el-icon-setting:before) {
  color: #fff;
}
</style>
