<template>
  <div>
    <main class="w">
      <div class="container">
        <sideBar :storelist="storelist" @sonActiveTab="getActiveTab"></sideBar>
        <div class="container-center">
          <el-carousel height="450px">
            <el-carousel-item v-for="item in imglist" :key="item">
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="container-right">
          <div class="container-right-top">
            <div class="avatar">
              <img src="https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png" alt="">
            </div>
            <div class="login-info">
              <span>Hi，欢迎来到宠物之家商城!</span>
            </div>
            <div class="btn">
              <el-button round type="danger" plain @click="login(2)">去注册</el-button>
              <el-button round type="danger" plain @click="login(1)">去登陆</el-button>
            </div>
          </div>
          <div class="container-right-buttom">
            <div class="notice" @click="toSaveDetail">
              <div class="title">
                <h4>公告</h4>
              </div>
              <div class="content">
                <ul>
                  <!-- <li></li> -->
                  <li v-for="(item, index) in noticelist" :key="index" style="margin-bottom: 8px;"><i
                      class="el-icon-s-flag" style="color: red"></i> {{ item }}</li>
                </ul>
              </div>
            </div>
            <div class="total">目前总救助金余额：<span style="color:red">253.6</span> 元</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
export default {
  components: {
    sideBar
  },
  data() {
    return {
      searchlist: {
        input: '',
        activeTab: ''
      },
      storelist: [
        { title: '喵星馆', content: [111, 222, 333] },
        { title: '汪星馆', content: [111, 222, 333] },
        { title: '宠主馆', content: [111, 222, 333] }],
      imglist: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190906/f1afc7510d4f471c55f0f361d3c50ac3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190907/26c6dc50400e816a103d4b0bbe93a362.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190906/2641a1b38b98c85bb263bbee0f8e1d2e.jpg'],
      noticelist: ['2022年5月20日，在贵州大学悦湖为流浪猫买猫粮花费30元',
        '2022年12月12日在贵州民族大学为流浪猫买猫窝花费50元',
        '2022年5月20日，在贵州大学悦湖为流浪猫买猫粮花费30元'
      ]
    }
  },
  methods: {
    login(e) {
      if (e === 1) {
        this.$router.push({ name: 'login' })
      } else if (e === 2) {
        this.$router.push({ name: 'reg' })
      }
    },
    getActiveTab(val) {
      this.searchlist = val
      this.$emit('getActiveTab', this.searchlist)
      console.log('indextab', this.searchlist)
    },
    toSaveDetail() {
      this.$router.push({ name: 'savedetail' })
    }
  }
  // mounted() {
  //   this.getActiveTab()
  // }
}
</script>
<style lang="less" scoped>
main {
  position: relative;
  height: 450px;

  .container-center {
    float: left;
    width: 748px;
    height: 450px;
    background-color: pink;

    img {
      height: 450px;
    }
  }

  .container-right {
    position: relative;
    left: 980px;
    width: 220px;
    height: 450px;
    background-color: #fff;

    .container-right-top {
      position: relative;
      width: 220px;
      height: 220px;

      .avatar {
        position: absolute;
        top: 20px;
        left: 70px;
        width: 80px;
        height: 80px;
        text-align: center;
        overflow: hidden;
        border-radius: 50%;
        background-color: pink;
      }

      .login-info {
        position: absolute;
        top: 120px;
        left: 20px;
      }

      .btn {
        position: absolute;
        top: 170px;
        left: 10px;
      }
    }

    .container-right-buttom {
      position: relative;
      width: 220px;
      height: 230px;

      .total {
        position: absolute;
        top: 200px;
        left: 20px;
      }

      .notice {
        position: absolute;
        top: 10px;
        left: 20px;
        cursor: pointer;

        .content {
          margin-top: 10px;

          ul li {
            //color: #333;
            color: #c1766a;
            margin-left: -10px;

            label {
              font-weight: 700;
              color: #f56c6c;
            }
          }
        }
      }
    }
  }

}
</style>
