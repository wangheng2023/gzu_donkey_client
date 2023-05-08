<template>
  <div>
    <headerDiv></headerDiv>
    <main class="w">
      <div class="search">
        <div class="pageHead">
          <el-page-header @back="goBack" style="margin-left: 10px;"></el-page-header>
        </div>
        <div class="search-box">
          <el-input placeholder="搜索商品名称" v-model="input">
            <el-button slot="append" icon="el-icon-search" @click="likeSearch('', input)"></el-button>
          </el-input>
        </div>
        <!-- <div style="font-size: 16px;margin-right: 20px; cursor: pointer; color: #f40;">全部商品</div> -->
      </div>
      <div style="background-color: #fff; border-radius: 20px; overflow: hidden;">
        <hotCard :hotlist="hotlist"></hotCard>
        <div>
          <el-empty v-if="total === 0" :image-size="200" description="暂无商品"></el-empty>
        </div>
        <footer class="footer">
          <div class="fenye">
            <el-pagination @current-change="fenye" background layout="prev, pager, next" :total="total"
              :page-size="pageSize" :current-page="currentPage"></el-pagination>
          </div>
        </footer>
      </div>
    </main>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import hotCard from './hotCard.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'
export default {
  components: {
    hotCard,
    footerDiv,
    headerDiv
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 12,
      total: 0,
      input: '' || this.$route.query.input,
      hotlist: [
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' }]
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getJumpGoods()
    }
    if (this.$route.query.area) {
      if (this.$route.query.area !== '5') {
        this.likeSearch(this.$route.query.area, this.$route.query.input)
      } else {
        this.likeSearch('', this.$route.query.input)
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    fenye(val) {
      this.currentPage = val
      this.getGoodlist()
      console.log(this.currentPage)
    },
    // 跳转之后查询商品
    async getJumpGoods() {
      const { data: res } = await this.$axios.post('goods/getGoodsByCategory', {
        categoryId: this.$route.query.id,
        pageNo: this.currentPage,
        pageSize: 12
      })
      console.log(res)
      if (res.code === 200) {
        this.hotlist = res.data.records
        this.total = res.data.total
        console.log(this.hotlist)
      }
    },
    // 模糊搜索
    async likeSearch(area, input) {
      const { data: res } = await this.$axios.post('/goods/searchGoods', {
        searchName: input,
        campus: area,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.hotlist = res.data.records
        this.total = res.data.total
      }
    }
  }
}
</script>
<style lang="less" scoped>
main {
  position: relative;

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-radius: 20px;
    overflow: hidden;
    //border-bottom: 1px solid #f40;
    margin-bottom: 10px;
    background-color: #fff;

    .search-box {
      border-radius: 20px;
      overflow: hidden;
      width: 30%;
      margin-right: 20px;
      border: 2px solid #f40;

      :deep(.el-input-group__append, .el-input-group__prepend) {
        background-color: rgb(241, 180, 180);
      }
    }
  }
}

.footer {
  height: 180px;

  .fenye {
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #EE356C !important; //修改默认的背景色
  }
}
</style>
