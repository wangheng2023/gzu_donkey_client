<template>
  <div class="main">
    <headerDiv></headerDiv>
    <section>
      <div class="w sec_main">
        <div class="pageHead">
          <el-page-header @back="goBack" content="商品详情" style="margin-left: 10px;"></el-page-header>
        </div>
        <div class="detail-box">
          <div class="goodtitle">
            <h3>fghdjl当哈利;京东i撒v <label for="">123元</label></h3>
            <span>2022.03.23 15:59 更新</span>
            <div class="shoucang">
              <div id="shoucang" @click="shoucang" style="font-size: 35px;margin-right: 10px;"
                class="iconfont icon-31shoucang"></div>
              <div id="word" style="margin-top: -10px;margin-left: 0px;">收藏</div>
            </div>
          </div>
          <div class="content">
            <zmdOthers :imglist="imglist"></zmdOthers>
            <div class="sellerinfo">
              <div class="avatar">
                <img src="https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png" alt="">
              </div>
              <div class="login-info">
                <span>Hi，欢迎来到黔驴二手商城!</span>
              </div>
              <div class="btn">
                <div style="width: 50%;">东区</div>
                <div style="width: 50%;">计算机科学与技术</div>
              </div>
              <div class="lianxi">
                <el-button type="danger" plain>联系我</el-button>
              </div>
            </div>
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
import zmdOthers from '@/components/zmdOthers.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    zmdOthers
  },
  data() {
    return {
      flag: 0,
      imglist: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/a22645df3f07d41cc351d33b75e26633.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/d75bf4e276560d2590e94d1bb25ed672.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/c425f923549f1e940d80bedc42622dd3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/13652ba89cada9454f5d668741ccbbcb.jpg']
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    shoucang() {
      const star = document.querySelector('#shoucang')
      const word = document.querySelector('#word')
      if (this.flag === 0) {
        star.className = 'iconfont icon-xihuanfill'
        word.innerHTML = '已收藏'
        this.flag = 1
      } else {
        star.className = 'iconfont icon-31shoucang'
        word.innerHTML = '收藏'
        this.flag = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.icon-xihuanfill {
  color: #ff5000;
}

section {
  margin-top: 10px;
}

.pageHead {
  margin-bottom: 10px;
  padding-top: 10px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  //border-bottom: 1px solid #EE356C;
  border-radius: 18px;
}

:deep(.el-carousel__indicators--outside) {
  margin-top: -50px;
}

.detail-box {
  margin-top: 10;
  padding-top: 10px;
  height: 480px;
  background-color: #fff;

  .goodtitle {
    position: relative;
    width: 95%;
    height: 60px;
    margin: 0 auto;
    //border: 1px solid #333;

    h3 {
      font-size: 24px;

      label {
        color: #ff5000;
        font-size: 20px;
      }
    }

    span {
      color: #8d8b8b;
    }

    .shoucang {
      position: absolute;
      right: 0;
      top: -10px;
      float: right;
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 10px;
    width: 95%;
    margin: 0 auto;

    .sellerinfo {
      position: relative;
      width: 300px;
      height: 350px;
      margin-top: -70px;
      border-radius: 18px;
      border: 1px solid #e3dede;

      .avatar {
        position: absolute;
        top: 20px;
        left: 110px;
        width: 80px;
        height: 80px;
        text-align: center;
        overflow: hidden;
        border-radius: 50%;
        background-color: pink;
      }

      .login-info {
        position: absolute;
        top: 110px;
        width: 100%;
        height: 20px;
        margin: 0 auto;
        text-align: center;
      }

      .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 150px;
        left: 30px;
        width: 80%;
        height: 60px;
        text-align: center;
        background-color: #fbfbfb;
      }

      .lianxi {
        position: absolute;
        top: 220px;
        left: 30px;

        .el-button {
          width: 240px;
        }
      }
    }
  }

}
</style>
