<template>
  <!-- 面包屑 -->
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin-bottom: 10px;">
      <el-breadcrumb-item :to="{ path: '/managegood' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-row :gutter="10">
          <!-- 搜索框 -->
          <el-col :span="3">
            <el-input placeholder="商品名称" size="large" v-model="searchobj.name" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="商品描述" size="large" v-model="searchobj.descript" clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchobj.publish_status" clearable @clear="getteacherlist" placeholder="请选择状态">
              <el-option label="正常" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchobj.category" clearable placeholder="请选择分类">
              <el-option v-for="item in options" :key="item.value" :label="item.categoryName" :value="item.id">
              </el-option>
            </el-select>
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
          <!-- <el-col :span="3">
            <el-button type="primary" @click="addteacher">添加商品</el-button>
          </el-col> -->
        </el-row>
      </div>
      <div class="main">
        <el-table height="450" :data="teacherlist" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="商品类别" width="100px">
            <template #default="scope">
              {{ scope.row.oneCategoryName }}
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="100px" />
          <el-table-column prop="descript" label="商品描述" width="180px" />
          <el-table-column prop="goodsPicInfos[0].picUrl" label="商品图片" width="340px">
            <template #default="scope">
              <img style="width: 100px; height: 100px;" v-for="(item, index) in scope.row.goodsPicInfos" :key="index"
                :src="item.picUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="price" label="商品价格" />
          <el-table-column prop="userName" label="发布人" width="130px">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <!-- <el-button size="mini" type="warning" @click="myEdit(scope.row)">修改
              </el-button> -->
              <el-button v-if="scope.row.publishStatus === 1" size="mini" type="danger" @click="myDelete(scope.row)">下架
              </el-button>
              <el-button v-if="scope.row.publishStatus === 2" size="mini" type="success" @click="myNoDelete(scope.row)">上架
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表单内容 -->

    </el-card>

    <!-- 添加商品的对话框 -->
    <!-- <el-dialog :visible.sync="dialogVisible" title="添加商品" width="50%" @close="resetaddform">
      <el-form ref="ruleFormRef" :model="addteacherform" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addteacherform.name" />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="addteacherform.description" />
        </el-form-item>
        <el-form-item label="商品类别" prop="">
          <el-cascader v-model="oneCategoryId" clearable :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="addteacherform.price" :precision="2" :step="0.1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" prop="">
          <twoUpload @uploadSuccess="uploadPicSuccess"></twoUpload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureaddteacher">确定</el-button>
        </span>
      </template>
    </el-dialog> -->

    <!-- 修改商品信息的对话框 -->
    <!-- <el-dialog :visible.sync="dialogVisible1" title="修改商品" width="50%" @close="reseteditform">
      <el-form ref="ruleeditRef" :model="editteacherlist" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editteacherlist.name" />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="editteacherlist.description" />
        </el-form-item>
        <el-form-item label="商品类别" prop="">
          <el-cascader v-model="Categoryedit" clearable :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="editteacherlist.price" :precision="2" :step="0.1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" prop="editpictureUrls">
          <twoUpload @uploadSuccess="uploadPicSuccess"></twoUpload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="sureedit">确定</el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>
<script>
// import twoUpload from '@/components/twoUpload.vue'
export default {
  components: {
    // twoUpload
  },
  data() {
    return {
      editId: '',
      options: [],
      searchobj: {},
      searchobjfirst: { name: '', descript: '', category: 0, publish_status: 0, campus: 0 },
      pictureUrls: [], // 图片
      dialogVisible: false,
      dialogVisible1: false,
      teacherlist: [],
      teacherName: '',
      addteacherform: {}, // 添加教师信息
      editteacherlist: {}, // 获取要修改的教师信息
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        academyId: [
          { required: true, message: '请输入商品类别', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        pictureUrls: [
          { required: true, message: '请输入学生图片', trigger: 'blur' }
        ],
        Categoryedit: [
          { required: true, message: '请输入商品类别', trigger: 'change' }
        ],
        studentPwd: [
          { required: true, message: '请输入学生密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getClasslist()
    this.getteacherlist()
  },
  methods: {
    handleChange() {
      console.log(this.oneCategoryId)
    },
    uploadPicSuccess(picList) {
      // TODO 处理业务逻辑
      this.$nextTick(() => {
        console.log(picList)
      })
      for (let i = 0; i < picList.length; i++) {
        this.pictureUrls.push(picList[i].url)
      }

      console.log(this.pictureUrls)
      // this.form.goodsPicInfos[0].isMaster = 1
      // console.log(this.form)
    },
    // 获取所有分类
    async getClasslist() {
      const { data: res } = await this.$axios.get('/goods/allCategory')
      if (res.code === 200) { this.options = res.data }
    },
    // 点击添加教师按钮
    // addteacher() {
    //   console.log(1)
    //   this.dialogVisible = true
    // },
    // 点击确定添加按钮
    // async sureaddteacher() {
    //   console.log(this.pictureUrls)
    //   this.$refs.ruleFormRef.validate(async valid => {
    //     if (!valid) { this.$message.error('请检查表单填写是否规范') } else {
    //       const { data: res } = await this.$axios.post('/admin/addProduct', {
    //         name: this.addteacherform.name,
    //         price: this.addteacherform.price,
    //         description: this.addteacherform.description,
    //         pictureUrls: this.pictureUrls,
    //         oneCategoryId: this.oneCategoryId[0],
    //         twoCategoryId: this.oneCategoryId[1],
    //         threeCategoryId: this.oneCategoryId[2]
    //       })
    //       if (res.code !== 200) { return this.$message.error(res.msg) } else {
    //         this.$message.success(res.msg)
    //         this.dialogVisible = false
    //         this.getteacherlist()
    //       }
    //     }
    //   })
    // },
    // 重置添加表单信息
    resetaddform() {
      this.$refs.ruleFormRef.resetFields()
    },
    reseteditform() {
      this.$refs.ruleeditRef.resetFields()
    },
    // 点击确定修改
    // async sureedit() {
    //   this.$refs.ruleeditRef.validate(async valid => {
    //     if (!valid) { this.$message.error('请检查表单填写是否规范') } else {
    //       const { data: res } = await this.$axios.post('/admin/updateProduct', {
    //         id: this.editId,
    //         name: this.editteacherlist.name,
    //         price: this.editteacherlist.price,
    //         description: this.editteacherlist.description,
    //         pictureUrls: this.pictureUrls,
    //         oneCategoryId: this.Categoryedit[0],
    //         twoCategoryId: this.Categoryedit[1],
    //         threeCategoryId: this.Categoryedit[2]
    //       })
    //       if (res.code === 200) {
    //         this.$message({ type: 'success', message: '修改成功' })
    //         this.getteacherlist()
    //         this.dialogVisible1 = false
    //       }
    //     }
    //   })
    // },
    // 点击修改按钮
    // async myEdit(row) {
    //   this.editteacherlist = row
    //   this.editId = row.id
    //   console.log(this.editteacherlist)
    //   this.Categoryedit = [row.oneCategoryId, row.twoCategoryId, row.threeCategoryId]
    //   // const { data: res } = await this.$axios.get('getTeacherById', { params: { teacherId: row.teacherId } })
    //   // if (res.code !== 200) { this.$message.error(res.message) } else {
    //   //   this.editteacherlist = res.data
    //   //   this.getacademylist()
    //   // }
    //   this.dialogVisible1 = true
    // },
    myDelete(row) {
      console.log(row)
      this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.post('/admin/deleteGoods', { goodsIdList: [row.id] })
        if (res.code !== 200) { return this.$message.error(res.message) } else {
          this.getteacherlist()
          this.$message({ type: 'success', message: '下架成功!' })
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消' })
      })
    },
    myNoDelete(row) {
      this.$confirm('此操作将上架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$axios.post('/admin/restoreGoods', { goodsIdList: [row.id] })
        if (res.code !== 200) { return this.$message.error(res.message) } else {
          this.getteacherlist()
          this.$message({ type: 'success', message: '上架成功!' })
        }
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消' })
      })
    },
    // 获取所有商品信息列表
    async getteacherlist() {
      const { data: res } = await this.$axios.post('/admin/searchGoods', this.searchobjfirst)
      if (res.code === 200) {
        this.teacherlist = res.data
        console.log(this.teacherlist)
      }
    },
    // 模糊查找
    async search() {
      const { data: res } = await this.$axios.post('/admin/searchGoods', {
        name: this.searchobj.name || '',
        descript: this.searchobj.descript || '',
        category: this.searchobj.category - 0 || 0,
        publish_status: this.searchobj.publish_status - 0 || null,
        campus: this.searchobj.campus - 0 || 0
      })
      if (res.code !== 200) { return this.$message.error(res.message) } else if (res.code === 200) {
        this.teacherlist = res.data || []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 15px;
}

.main {
  height: 450px;
  overflow: scroll;
}
</style>
