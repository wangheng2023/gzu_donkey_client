<template>
  <div>
    <main class="w">
      <div class="bg">
        <div class="container">
          <div style="margin-right: 10px;">
            <sideBar :storelist="storelist" @sonActiveTab="getActiveTab"></sideBar>
          </div>
          <div class="container-center">
            <el-carousel height="370px">
              <el-carousel-item v-for="item in imglist" :key="item">
                <img :src="item" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="container-right">
            <indexRight></indexRight>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
import indexRight from './indexRight.vue'
export default {
  components: {
    sideBar,
    indexRight
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
  margin-top: 20px;

  .bg {
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
  }

  .container {
    margin: 20px;
  }

  .container-center {
    float: left;
    width: 615px;
    height: 370px;
    margin-left: 15px;
    background-color: pink;

    img {
      height: 370px;
    }
  }

  .container-right {
    position: relative;
    left: 890px;
    width: 280px;
    height: 370px;
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
  }

}
</style>
