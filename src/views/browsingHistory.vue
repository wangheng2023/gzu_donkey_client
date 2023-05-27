<template>
  <div>
    <headerDiv></headerDiv>
    <section>
      <div class="w bg">
        <div class="search-box">
          <div class="pageHead">
            <el-page-header @back="goBack" style="margin-right: 10px;">
            </el-page-header>
          </div>
          <el-input class="search" placeholder="搜索商品名称" v-model="input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-divider><i class="el-icon-shopping-cart-full"></i></el-divider>
        <div class="title">
          <div class="tit-left">
            浏览记录（全部 <label class="data" for="">{{ tableData.length }}</label> ）
          </div>
        </div>
        <!-- 购物车卡片 -->
        <div class="table-box">
          <el-table ref="multipleTable" height="550" :data="tableData" tooltip-effect="dark">
            <el-table-column prop="img" label="商品信息" width="150">
              <template slot-scope="scope">
                <div>
                  <img style="height: 100px;" v-if="scope.row.goodsPicInfos[0]?.isMaster === 1"
                    :src="scope.row.goodsPicInfos[0]?.picUrl" alt="加载失败">
                  <el-empty v-else description="暂无图片" :image-size="50" style="width: 100px;height: 100px;"></el-empty>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名" width="150">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.goodsName }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="descript" label="商品描述" width="300">
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.descript }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="单价" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDelete(scope.row)">取消收藏</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>

    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import headerDiv from '@/components/headerDiv.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
export default {
  components: {
    headerDiv,
    footerDiv
  },
  data() {
    return {
      input: '',
      tableData: []
    }
  },
  created() {
    this.getCollect()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 获得收藏列表
    async getCollect() {
      const { data: res } = await this.$axios.get('/goods/getGoodsNew')
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    async handleDelete(row) {
      const { data: res } = await this.$axios.get(`collect/cancelCollect?goodsId=${row.id}`)
      if (res.code === 200) {
        this.$message({ type: 'success', message: '已取消收藏' })
        this.tableData = res.data || []
      }
    }
  }
}
</script>
<style lang="less" scoped>
section {
  height: 750px;
}

.table-box {
  width: 800px;
  //border: 1px solid #333;
  margin: 0 auto;
}

.pageHead {
  padding-top: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  //border-bottom: 1px solid #EE356C;
  border-radius: 18px;
}

.bg {
  background-color: #fff;
  height: 750px;

  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 65%;
    margin-left: 20px;

    :deep(.el-input-group__append, .el-input-group__prepend) {
      background-color: rgb(241, 180, 180);
    }

    .search {
      margin-top: 20px;
      border: 2px solid #f40;
      border-radius: 20px;
      overflow: hidden;
    }
  }

  .el-divider {
    font-size: 18px;
    background-color: #EE356C;
  }

  .el-icon-shopping-cart-full:before {
    content: "\e751";
    font-size: 28px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #b0afaf;

    .tit-left,
    .tit-right {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
    }

    .tit-right {
      width: 35%;
      display: flex;
      justify-content: space-around;
      margin-right: 20px;
    }

    .data {
      color: #EE356C;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
