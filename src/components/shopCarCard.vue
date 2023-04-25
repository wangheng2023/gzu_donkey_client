<template>
  <div>
    <div class="table-box">
      <el-table ref="multipleTable" height="550" :data="tableData" tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="全选" width="100">
        </el-table-column>
        <el-table-column prop="img" label="商品信息" width="100">
          <template slot-scope="scope">
            <div>
              <img style="height: 100px;" :src="scope.row.img" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gooddecs" width="420">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.gooddecs }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodprice" label="单价" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="number" label="数量" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="number">
              <el-input-number v-model="scope.row.number" :disabled="flag === 1 ? true : false" size="mini"
                @change="handleChange(scope.row)" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodtotal" label="金额" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span style="color:#EE356C">{{ goodtotal=scope.row.number * scope.row.goodprice }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: 0, // 判断选中后不能修改数量
      goodtotal: 0,
      total: 0,
      multipleSelection: [],
      tableData: [
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/191.png',
          gooddecs: '烤面筋',
          goodprice: '123',
          number: 1
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/591.png',
          gooddecs: '烤面筋',
          goodprice: '123',
          number: 2
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/101.png',
          gooddecs: '烤面筋',
          goodprice: '123',
          number: 3
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/199.png',
          gooddecs: '烤面筋',
          goodprice: '123',
          number: 1
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/300.png',
          gooddecs: '烤面筋',
          goodprice: '123',
          number: 1
        }
      ]
    }
  },
  methods: {
    handleDelete(index, row) {
      // console.log(index, row)
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
.number {
  width: 50px;

}
</style>
