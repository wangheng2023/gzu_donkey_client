<template>
  <!-- 面包屑 -->
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/managerorder' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-row :gutter="10">
          <!-- 搜索框 -->
          <el-col :span="4">
            <el-input placeholder="请输入分类名" size="large" v-model="searchobj.name" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
          <!-- 添加用户按钮-->
          <el-col :span="3">
            <el-button type="primary" @click="addacademy">添加分类</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表单内容 -->
      <el-table :data="teacherlist" height="450px" style="width: 100%">
        <el-table-column type="index" width="70" />
        <el-table-column prop="categoryName" label="分类名称" />
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
    <!-- 添加分类的对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加分类" width="50%" @close="resetaddform">
      <el-form ref="ruleFormRef" :model="addacademyform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="addacademyform.categoryName" />
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
    <el-dialog :visible.sync="dialogVisible1" title="修改分类" width="50%" @close="reseteditform">
      <el-form ref="ruleFormRefedit" :model="editacademyform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="editacademyform.categoryName" />
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
      rules: {
        categoryName: [
          { required: true, message: '请输入学院名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getteacherlist()
  },
  methods: {
    // 获取所有分类信息列表
    async getteacherlist() {
      const { data: res } = await this.$axios.post('/admin/searchCategory', {
        name: ''
      })
      if (res.code === 200) {
        this.teacherlist = res.data
        console.log(this.teacherlist)
      }
    },
    // 模糊查找
    async search() {
      const { data: res } = await this.$axios.post('/admin/searchCategory', {
        name: this.searchobj.name || ''
      })
      if (res.code === 200) {
        this.teacherlist = res.data
      }
    },
    // 添加分类
    addacademy() {
      this.dialogVisible = true
    },
    // 确定添加
    async sureaddacademy() {
      const { data: res } = await this.$axios.post('/admin/addCategory', this.addacademyform)
      if (res.code === 200) {
        this.$message({ type: 'success', message: '添加成功' })
        this.dialogVisible = false
        this.getteacherlist()
      }
    },
    myEdit(row) {
      console.log(row)
      this.editacademyform = row
      this.dialogVisible1 = true
    },
    // 确认修改
    async sureeditacademy() {
      const { data: res } = await this.$axios.post('/admin/updateCategory', {
        id: this.editacademyform.id,
        categoryName: this.editacademyform.categoryName
      })
      if (res.code === 200) {
        this.$message({ type: 'success', message: '修改成功' })
        this.dialogVisible1 = false
        this.getteacherlist()
      }
    },
    async myDelete(row) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.get(`/admin/deleteCategory?categoryId=${row.id}`)
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
