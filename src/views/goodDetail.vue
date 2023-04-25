<template>
  <div class="main">
    <headerDiv></headerDiv>
    <section>
      <div class="sec_main">
        <div class="w detail-box">
          <div class="pageHead">
            <el-page-header @back="goBack" content="商品详情" style="margin-left: 10px;"></el-page-header>
          </div>
          <div class="content">
            <div class="image">
              <el-carousel type="card">
                <el-carousel-item v-for="item in imglist" :key="item">
                  <img style="height: 300px;" :src="item" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="info">
              <div class="info-title">
                <span style="font-size: 18px;margin-left: 20px;color:#EE356C">大面筋</span>
                <span style=" font-size: 18px;margin-right: 20px;color:#EE356C">1200元</span>
              </div>
              <div class="info-content">localStorage:
                localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
                localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
                localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
              </div>
              <div class="info-other">其他信息：</div>
            </div>
            <div class="btn">
              <el-button round type="danger" plain style="margin-left: 20px;">加入购物车</el-button>
              <el-button round type="danger" plain style="margin-right: 20px;">点我购买</el-button>
            </div>
            <div class="tips">该商品预计提供救助金<label for="" style="color: red;font-size: 700;">12.5</label>元</div>
            <!-- {{ detail }} -->
          </div>
        </div>
      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'// 引入头部模块
export default {
  components: {
    footerDiv,
    headerDiv
  },
  data() {
    return {
      imglist: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/a22645df3f07d41cc351d33b75e26633.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/d75bf4e276560d2590e94d1bb25ed672.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/c425f923549f1e940d80bedc42622dd3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/13652ba89cada9454f5d668741ccbbcb.jpg']
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
section {
  height: 610px;
}

.detail-box {
  height: 600px;
  background-color: #fff;

  .pageHead {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #EE356C;
  }

  :deep(.el-carousel__indicators--outside) {
    margin-top: -50px;
  }

  .info {
    // display: flex;
    // align-items: center;
    width: 100%;
    height: 150px;

    .info-title {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .info-content {
      margin-left: 20px;
      margin-top: 10px;
      color: #333;
      font-size: 16px;
    }

    .info-other {
      margin-left: 20px;
      margin-top: 10px;
      color: #666;
    }
  }

  .btn {
    display: flex;
    justify-content: space-between;
    //margin-top: 30px;
  }

  .tips {
    float: right;
    margin: 10px 20px 0 0;
    //color: #EE356C;
  }
}
</style>
