<template>
  <div>
    <headerDiv></headerDiv>
    <section>
      <div class="w">
        <div class="pageHead">
          <el-page-header @back="goBack" style="margin-right: 10px;">
          </el-page-header>
        </div>
        <div class="infobox">
          <div class="top">
            <div class="top-left">
              <div class="avatar"><img :src="userinfo.imageUrl" alt=""></div>
              <div class="word">
                <el-tag type="info">{{ userinfo.nickName }}</el-tag>
                <div style="margin-top: 20px;">个人简介：{{ userinfo.signature ? userinfo.signature : '暂无' }}</div>
              </div>
            </div>
            <div class="top-right">
              <el-button type="primary" plain @click="toUpdate">修改信息</el-button>
            </div>
          </div>
          <div class="tags">其他信息：
            <el-tag v-if="userinfo.userStatus">{{ userinfo.userStatus }}</el-tag>&nbsp;
            <el-tag v-if="userinfo.departmentInfoId">{{ departmentName }}</el-tag>&nbsp;
            <el-tag v-if="userinfo.userCampus">{{ userCampus }}</el-tag>
          </div>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName">
            <el-tab-pane label="我发布的商品" name="first">
              <hotCard :hotlist="hotlist"></hotCard>
            </el-tab-pane>
            <el-tab-pane label="我的订单" name="second">
              <shopCarCard @gettotal="gettotal($event)" :tableData="tableData"></shopCarCard>
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
import headerDiv from '@/components/headerDiv.vue'
import hotCard from '@/components/hotCard.vue'
import shopCarCard from '@/components/shopCarCard.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    hotCard,
    shopCarCard
  },
  data() {
    return {
      userinfo: {},
      activeName: 'first',
      departmentName: '',
      hotlist: [
        {
          img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: '123元',
          decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋'
        },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' }
      ],
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
    this.getUserInfo()
    this.getgoodsbyid()
  },
  methods: {
    changeuserinfo() { },
    goBack() {
      this.$router.go(-1)
    },
    toUpdate() {
      this.$router.push({ name: 'accountset' })
    },
    // 一进入页面获得用户信息
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/user/getCustomerInfo')
      if (res.code === 200) {
        this.userinfo = res.data
        if (this.userinfo.userCampus === 1) { this.userCampus = '北校区' }
        if (this.userinfo.userCampus === 2) { this.userCampus = '西校区' }
        if (this.userinfo.userCampus === 3) { this.userCampus = '东校区' }
        if (this.userinfo.userCampus === 4) { this.userCampus = '南校区' }
        // departmentInfoId
        const { data: res1 } = await this.$axios.get(`department/getDepartmentById?departmentId=${this.userinfo.departmentInfoId}`)
        if (res1.code === 200) {
          this.departmentName = res1.data.departmentName
        }
      }
    },
    // 根据用户id获得用户发布信息
    async getgoodsbyid() {
      const id = window.sessionStorage.getItem('userid')
      const { data: res } = await this.$axios.get(`/goods/getGoodsVoByUserId?userId=${id}`)
      if (res.code === 200) {
        this.hotlist = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.w {
  background-color: #fff;
  min-height: 650px;
}

.infobox {
  margin: 20px 100px;
  padding-top: 20px;
}

.avatar {
  width: 80px;
  height: 80px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50px;

  }
}

.top {
  display: flex;
  justify-content: space-between;

  .top-left {
    display: flex;
    justify-content: left;

    .word {
      margin-left: 10px;
    }
  }
}

.tags {
  color: #9f9e9e;
  margin-top: 40px;
}

.tabs {
  margin-top: 20px;
  margin: 0 20px 0
}

.pageHead {
  padding-top: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #EE356C;
  margin-bottom: 20px;
}
</style>
