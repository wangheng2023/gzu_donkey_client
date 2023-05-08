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
            我的收藏（全部 <label class="data" for="">22</label> ）
          </div>
          <!-- <div class="tit-right">
            <div style="font-size: 18px;">已选商品 <label class="data" for="">{{ total }}</label> 元</div>
            <div>预计提供救助金 <label style="color:#EE356C" for=""> {{ fund }}</label> 元</div>
            <div> <el-button type="danger" round><label for="" style="color: #fff;font-size: 15px;">支付</label></el-button>
            </div>
          </div> -->
        </div>
        <!-- 购物车卡片 -->
        <shopCarCard @gettotal="gettotal($event)" :tableData="tableData"></shopCarCard>
      </div>

    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import headerDiv from '@/components/headerDiv.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import shopCarCard from '@/components/shopCarCard.vue'
export default {
  components: {
    headerDiv,
    footerDiv,
    shopCarCard
  },
  data() {
    return {
      input: '',
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
  created() {
    this.getCollect()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 获得收藏列表
    async getCollect() {
      const { data: res } = await this.$axios.get('collect/allCollect')
      if (res.code === 200) {
        this.tableData = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
section {
  height: 750px;
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
