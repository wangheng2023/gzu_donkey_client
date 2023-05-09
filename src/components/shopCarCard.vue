<template>
  <div>
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
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  // props: {
  //   tableData: {}
  // },
  data() {
    return {
      flag: 0, // 判断选中后不能修改数量
      goodtotal: 0,
      total: 0,
      multipleSelection: [],
      tableData: []
    }
  },
  created() {
    this.getCollect()
  },
  methods: {
    // 获得收藏列表
    async getCollect() {
      const { data: res } = await this.$axios.get('collect/allCollect')
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // if (this.flag === 0) {
      //   this.flag = 1
      // } else {
      //   this.flag = 0
      // }
    },
    handleChange(row) {
      this.goodtotal = row.number * row.goodprice
    }
  },
  watch: {
    multipleSelection: {
      handler(newval, oldval) {
        const result = newval.reduce((a, b) => {
          a = a + b.goodprice * b.number
          return a
        }, 0)
        this.$emit('gettotal', result)
        console.log('newval', newval, 'oldval', oldval, result)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.table-box {
  width: 800px;
  //border: 1px solid #333;
  margin: 0 auto;
}
</style>
