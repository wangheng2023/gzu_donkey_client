<template>
  <!-- 面包屑 -->
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin-bottom: 10px;">
      <el-breadcrumb-item :to="{ path: '/managerorder' }">学院管理</el-breadcrumb-item>
      <el-breadcrumb-item>学院信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-row :gutter="10">
          <!-- 搜索框 -->
          <el-col :span="4">
            <el-input placeholder="请输入学院名" size="large" v-model="searchobj.name" clearable>
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
          <el-col :span="3">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
          <!-- 添加用户按钮-->
          <el-col :span="3">
            <el-button type="primary" @click="addacademy">添加学院</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表单内容 -->
      <el-table :data="teacherlist" height="480px" style="width: 100%">
        <el-table-column type="index" width="70" />
        <el-table-column prop="departmentCampus" label="所在校区">
          <template #default="scope">
            <span v-if="scope.row.departmentCampus === 1">北校区</span>
            <span v-if="scope.row.departmentCampus === 2">西校区</span>
            <span v-if="scope.row.departmentCampus === 3">东校区</span>
            <span v-if="scope.row.departmentCampus === 4">南校区</span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="学院名称" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="mini" type="warning" @click="myEdit(scope.row)">修改
            </el-button>
            <el-button size="mini" type="danger" @click="myDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加学院的对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加学院" width="50%" @close="resetaddform">
      <el-form ref="ruleFormRef" :model="addacademyform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="学院所在校区" prop="departmentCampus">
          <el-select v-model="addacademyform.departmentCampus" clearable placeholder="请选择校区">
            <el-option label="北校区" value=1></el-option>
            <el-option label="西校区" value=2></el-option>
            <el-option label="东校区" value=3></el-option>
            <el-option label="南校区" value=4></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院名称" prop="departmentName">
          <el-input v-model="addacademyform.departmentName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureaddacademy">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改学院的对话框 -->
    <el-dialog :visible.sync="dialogVisible1" title="添加学院" width="50%" @close="reseteditform">
      <el-form ref="ruleFormRefedit" :model="editacademyform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="学院所在校区" prop="departmentCampus">
          <el-select v-model="editItem" clearable placeholder="请选择校区">
            <el-option label="北校区" value='1'></el-option>
            <el-option label="西校区" value='2'></el-option>
            <el-option label="东校区" value='3'></el-option>
            <el-option label="南校区" value='4'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院名称" prop="departmentName">
          <el-input v-model="editacademyform.departmentName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="sureeditacademy">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacherlist: [],
      teacherName: '',
      searchobj: {}, // 搜索信息
      dialogVisible: false, // 添加学院对话框
      dialogVisible1: false, // 修改学院对话框
      editacademyform: {}, // 修改学院信息
      addacademyform: {}, // 添加学院信息
      editItem: '',
      rules: {
        departmentCampus: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        departmentName: [
          { required: true, message: '请输入学院名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getteacherlist()
  },
  methods: {
    // 获取所有老师信息列表
    async getteacherlist() {
      const { data: res } = await this.$axios.post('/admin/searchDepartment', {
        name: '',
        campus: 0
      })
      if (res.code === 200) {
        this.teacherlist = res.data
        console.log(this.teacherlist)
      }
    },
    // 模糊查找
    async search() {
      const { data: res } = await this.$axios.post('/admin/searchDepartment', {
        name: this.searchobj.name || '',
        campus: this.searchobj.campus - 0 || 0
      })
      if (res.code === 200) {
        this.teacherlist = res.data
      }
    },
    // 添加学院
    addacademy() {
      this.dialogVisible = true
    },
    // 确定添加
    async sureaddacademy() {
      const { data: res } = await this.$axios.post('/admin/addDepartment', this.addacademyform)
      if (res.code === 200) {
        this.$message({ type: 'success', message: '添加成功' })
        this.dialogVisible = false
        this.getteacherlist()
      }
    },
    myEdit(row) {
      console.log(row)
      this.editacademyform = row
      this.editItem = this.editacademyform.departmentCampus + ''
      this.dialogVisible1 = true
    },
    // 确认修改
    async sureeditacademy() {
      const { data: res } = await this.$axios.post('/admin/updateDepartment', {
        id: this.editacademyform.id,
        departmentName: this.editacademyform.departmentName,
        departmentCampus: this.editItem - 0
      })
      if (res.code === 200) {
        this.$message({ type: 'success', message: '修改成功' })
        this.dialogVisible1 = false
        this.getteacherlist()
      }
    },
    async myDelete(row) {
      this.$confirm('此操作将永久删除该学院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.get(`/admin/deleteDepartment?departmentId=${row.id}`)
        if (res.code === 200) {
          this.$message({ type: 'success', message: '删除成功' })
          this.getteacherlist()
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消' })
      })
    },
    // 重置添加表单信息
    resetaddform() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 重置修改表单信息
    reseteditform() {
      this.$refs.ruleFormRefedit.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 15px;
}
</style>
