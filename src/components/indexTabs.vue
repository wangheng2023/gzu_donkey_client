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
      userinfo: { imageUrl: '', id: '' },
      searchlist: {
        input: '',
        activeTab: ''
      },
      imglist: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/a22645df3f07d41cc351d33b75e26633.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/d75bf4e276560d2590e94d1bb25ed672.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/c425f923549f1e940d80bedc42622dd3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/13652ba89cada9454f5d668741ccbbcb.jpg'],
      storelist: []
    }
  },
  created() {
    this.getGoodClass()
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
    // 获取商品分类
    async getGoodClass() {
      const { data: res } = await this.$axios.get('goods/allCategory')
      if (res.code === 200) {
        this.storelist = res.data
      }
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
    width: 570px;
    height: 370px;
    margin-left: 10px;
    background-color: pink;

    img {
      width: 580px;
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
