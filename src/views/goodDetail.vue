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
            <h3>{{ goodinfo.goodsName }} &nbsp;&nbsp;<label for="">{{ goodinfo.cost }}元</label></h3>
            <span>{{ goodinfo.modifiedTime }} 更新</span>
            <div class="shoucang">
              <div id="shoucang" @click="shoucang" style="font-size: 35px;margin-right: 10px;"
                class="iconfont icon-shoucang"></div>
              <div id="word" style="width: 60px; text-align: center; margin-top: -10px;margin-left: -12px;">收藏</div>
            </div>
          </div>
          <div class="content">
            <zmdOthers :imglist="imglist"></zmdOthers>
            <div class="sellerinfo">
              <div class="avatar" @click="toUserinfo(userinfo.id)">
                <img
                  :src="userinfo.imageUrl ? userinfo.imageUrl : 'https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png'"
                  alt="">
              </div>
              <div class="login-info">
                <span>{{ userinfo.nickName }}</span>
              </div>
              <div class="btn">
                <div style="width: 50%;">{{ userCampus }}</div>
                <div style="width: 50%;">{{ userinfo.departmentName }}</div>
              </div>
              <div class="lianxi">
                <el-button type="danger" plain @click="toMessage">联系我</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs">
          <el-tabs type="border-card">
            <el-tab-pane label="商品描述">{{ goodinfo.descript }}</el-tab-pane>
            <el-tab-pane label="评价">
              <goodEvaluate></goodEvaluate>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'// 引入头部模块 goodsPicInfos
import zmdOthers from '@/components/zmdOthers.vue'
import goodEvaluate from '@/components/goodEvaluate.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    zmdOthers,
    goodEvaluate
  },
  data() {
    return {
      userid: '',
      goodinfo: {},
      userinfo: {},
      userCampus: '',
      flag: 0,
      imglist: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/a22645df3f07d41cc351d33b75e26633.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/d75bf4e276560d2590e94d1bb25ed672.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/c425f923549f1e940d80bedc42622dd3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/13652ba89cada9454f5d668741ccbbcb.jpg']
    }
  },
  created() {
    this.getgoodbyid()
    this.isCollect()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toMessage() {
      this.$router.push({ name: 'mydialog' })
    },
    async shoucang() {
      const id = this.$route.query.id
      const star = document.querySelector('#shoucang')
      const word = document.querySelector('#word')
      console.log(this.flag)
      if (this.flag === 1) {
        star.className = 'iconfont icon-shoucang1'
        word.innerHTML = '已收藏'
        this.flag = 0
        const { data: res } = await this.$axios.get(`collect/cancelCollect?goodsId=${id}`)
        if (res.code === 200) { this.$message({ type: 'success', message: '已取消收藏' }); this.isWhat() }
      } else {
        star.className = 'iconfont icon-shoucang'
        word.innerHTML = '收藏'
        this.flag = 1
        const { data: res } = await this.$axios.get(`collect/addCollect?goodsId=${id}`)
        if (res.code === 200) { this.$message({ type: 'success', message: '收藏成功' }); this.isWhat() }
      }
    },
    toUserinfo(val) {
      this.$router.push({ name: 'userinfother', query: { id: val } })
    },
    // 根据id获得商品
    async getgoodbyid() {
      const id = this.$route.query.id
      const { data: res } = await this.$axios.get(`goods/getGoodsVoById?goodsId=${id}`)
      if (res.code === 200) {
        this.goodinfo = res.data
        this.userid = res.data.userId
        this.getuserinfobyid()
        const dateold = new Date(res.data.modifiedTime)
        this.goodinfo.modifiedTime = dateold.toLocaleString()
      }
    },
    // 查看是否收藏
    async isCollect() {
      const id = this.$route.query.id
      const { data: res } = await this.$axios.get(`collect/isCollect?goodsId=${id}`)
      if (res.code === 200) {
        this.flag = res.isCollect
        this.isWhat()
      }
    },
    isWhat() {
      const star = document.querySelector('#shoucang')
      const word = document.querySelector('#word')
      if (this.flag === 1) {
        star.className = 'iconfont icon-shoucang1'
        word.innerHTML = '已收藏'
        // this.flag = 0
      } else {
        star.className = 'iconfont icon-shoucang'
        word.innerHTML = '收藏'
        // this.flag = 1
      }
    },
    // 根据id获得用户信息
    async getuserinfobyid() {
      const { data: res } = await this.$axios.get(`user/getUserInfoVoById?userId=${this.userid}`)
      if (res.code === 200) {
        this.userinfo = res.data
        if (this.userinfo.userCampus === 1) { this.userCampus = '北校区' }
        if (this.userinfo.userCampus === 2) { this.userCampus = '西校区' }
        if (this.userinfo.userCampus === 3) { this.userCampus = '东校区' }
        if (this.userinfo.userCampus === 4) { this.userCampus = '南校区' }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.icon-shoucang1 {
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
  border-radius: 18px;

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
        cursor: pointer;

        img {
          width: 80px;
          height: 80px;
        }
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

.tabs {
  width: 100%;
  height: 450px;
  margin-top: 20px;
  border-radius: 18px;
  overflow: hidden;

  .el-tabs {
    height: 450px;
    font-size: 18px;
  }
}
</style>
