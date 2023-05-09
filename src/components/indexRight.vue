<template>
  <div>
    <div class="container-right-top">
      <div class="avatar">
        <img :src="userinfo.imageUrl || ' https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png'" alt="">
      </div>
      <div class="login-info">
        <span>{{ userinfo.mobilePhone ? userinfo.mobilePhone + ',欢迎来到黔驴二手商城!' : 'Hi，欢迎来到黔驴二手商城!' }}</span>
      </div>
      <div class="btn1" v-if="userinfo.id !== ''">
        <el-button round type="danger" plain @click="logout">退出登录</el-button>
      </div>
      <div class="btn" v-else>
        <el-button round type="danger" plain @click="login(2)">去注册</el-button>
        <el-button round type="danger" plain @click="login(1)">去登陆</el-button>
      </div>
    </div>
    <div class="container-right-buttom">
      <div @click="jump(1)">
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31shoucang"></div>
        <div>宝贝收藏</div>
      </div>
      <div @click="jump(2)">
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31pinglun"></div>
        <div>我的会话</div>
      </div>
      <div @click="jump(3)">
        <div style="font-size: 40px; padding-left: 5px;" class="iconfont icon-31guanzhu1"></div>
        <div>我的关注</div>
      </div>
      <div @click="jump(4)">
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31zuji"></div>
        <div>历史浏览</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userinfo: { imageUrl: '', id: '' }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 一进入页面查看用户是否登录
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/user/getCustomerInfo')
      if (res.code === 200) {
        this.userinfo = res.data
        console.log('this.userinfo', res.data)
      }
    },
    login(e) {
      if (e === 1) {
        this.$router.push({ name: 'login' })
      } else if (e === 2) {
        this.$router.push({ name: 'reg' })
      }
    },
    jump(val) {
      if (val === 1) {
        this.$router.push({ name: 'shopingcar' })
      } else if (val === 2) {
        this.$router.push({ name: 'mydialog' })
      } else if (val === 3) {
        this.$router.push({ name: 'attentionpage' })
      } else {
        this.$router.push({ name: 'shopingcar' })
      }
    },
    // 退出登录
    async logout() {
      const { data: res } = await this.$axios.get('/user/logout')
      if (res.code === 200) {
        if (this.$route.path === '/index') {
          this.$router.go(0)
        } else {
          this.$router.push({ name: 'index' })
        }
        window.sessionStorage.removeItem('userid')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container-right-top {
  position: relative;
  width: 100%;
  height: 220px;
  //border: 1px solid #333;

  .avatar {
    position: absolute;
    top: 20px;
    left: 90px;
    width: 80px;
    height: 80px;
    text-align: center;
    overflow: hidden;
    border-radius: 50%;
    background-color: pink;

    img {
      width: 80px;
      height: 80px;
    }
  }

  .login-info {
    position: absolute;
    top: 120px;
    width: 100%;
    text-align: center;
  }

  .btn1 {
    position: absolute;
    top: 170px;
    left: 75px;
  }

  .btn {
    position: absolute;
    top: 170px;
    left: 40px;
  }
}

.container-right-buttom {
  position: relative;
  width: 100%;
  height: 150px;
  top: -110px;
  display: flex;
  justify-content: space-between;
}
</style>
