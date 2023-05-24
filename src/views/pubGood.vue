<template>
  <div>
    <headerDiv></headerDiv>
    <div class="pageHead">
      <el-page-header @back="goBack" content="发布商品" style="margin-right: 10px;">
      </el-page-header>
    </div>
    <section class="w">
      <div class="formbox">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.oneCategoryId" clearable placeholder="请选择商品类型">
              <el-option v-for="item in options" :key="item.id" :label="item.categoryName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.descript" type="textarea" placeholder="请输入商品描述" maxlength="30"
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="商品校区">
            <el-select v-model="form.goodsCampus" clearable placeholder="请选择商品类型">
              <el-option v-for="item in optionsCampus" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
             <el-input-number v-model="form.price" @change="handleChange" :precision="2" :step="1" :min="0" label="请输入商品价格"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <twoUpload @uploadSuccess="uploadPicSuccess"></twoUpload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload">发布</el-button>
          </el-form-item>
        </el-form>
      </div>

    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import headerDiv from '@/components/headerDiv.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import twoUpload from '@/components/twoUpload.vue'
export default {
  components: {
    headerDiv,
    footerDiv,
    twoUpload
  },
  data() {
    return {
      flag: 0,
      form: {
        goodsName: '',
        oneCategoryId: '',
        price: '',
        goodsCampus: '',
        descript: '',
        goodsPicInfos: []
      },
      options: [],
      optionsCampus: [{ id: 1, name: '北校区' }, { id: 2, name: '西校区' }, { id: 3, name: '东校区' }, { id: 4, name: '南校区' }]
    }
  },
  created() {
    this.getGoodClass()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    uploadPicSuccess(picList) {
      this.flag = 1
      // TODO 处理业务逻辑
      this.$nextTick(() => {
        this.form.img = JSON.stringify(picList)
      })
      for (let i = 0; i < picList.length; i++) {
        this.form.goodsPicInfos.push({ picUrl: picList[i].url, isMaster: 0 })
      }
      this.form.goodsPicInfos[0].isMaster = 1
      console.log(this.form)
    },
    // 获取商品分类
    async getGoodClass() {
      const { data: res } = await this.$axios.get('goods/allCategory')
      if (res.code === 200) {
        this.options = res.data
        console.log(this.options)
      }
    },
    // 发布商品
    async submitUpload() {
      if (this.flag === 1) {
        const { data: res } = await this.$axios.post('goods/addGoods', this.form)
        if (res.code === 200) {
          this.$message({ type: 'success', message: res.msg })
          this.$router.push({ name: 'index' })
        } else {
          this.$message({ type: 'info', message: res.msg })
        }
      } else {
        this.$message({ type: 'error', message: '请先点击上传图片按钮' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.w {
  background-color: #fff;
  min-height: 500px;
  margin-bottom: 10px;
  border-radius: 18px;
  padding-top: 10px;
}

.formbox {
  width: 80%;
  min-height: 400px;
  margin: 20px auto;
  // box-shadow: darkgrey 5px 5px 10px 3px; //边框阴影
  padding: 20px 100px;
}

.pageHead {
  padding-top: 10px;
  width: 1200px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  //border-bottom: 1px solid #EE356C;
  border-radius: 18px;
  margin: 10px auto;
}
</style>
