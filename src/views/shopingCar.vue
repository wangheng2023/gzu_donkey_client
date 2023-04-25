<template>
  <div>
    <headerDiv></headerDiv>
    <section>
      <div class="w bg">
        <div class="search-box">
          <el-input class="search" placeholder="搜索商品名称" v-model="input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-divider><i class="el-icon-shopping-cart-full"></i></el-divider>
        <div class="title">
          <div class="tit-left">
            购物车（全部 <label class="data" for="">22</label> ）
          </div>
          <div class="tit-right">
            <div style="font-size: 18px;">已选商品 <label class="data" for="">{{ total }}</label> 元</div>
            <div>预计提供救助金 <label style="color:#EE356C" for=""> {{ fund }}</label> 元</div>
            <div> <el-button type="danger" round><label for="" style="color: #fff;font-size: 15px;">支付</label></el-button>
            </div>
          </div>
        </div>
        <!-- 购物车卡片 -->
        <shopCarCard @gettotal="gettotal($event)"></shopCarCard>
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
      total: 0,
      fund: 0
    }
  },
  watch: {
    total: {
      handler(newval, oldval) {
        this.fund = newval * 0.05
      }
    }
  },
  methods: {
    gettotal($event) {
      console.log($event)
      this.total = $event || 0
    }
  },
  mounted() {
    this.gettotal()
  }
}
</script>
<style lang="less" scoped>
section {
  height: 750px;
}

.bg {
  background-color: #fff;
  height: 750px;

  .search-box {
    height: 60px;
    width: 30%;

    .search {
      float: right;
      margin-top: 20px;
      padding-left: 10px;
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
