<template>
  <div>
    <div class="container-right-top">
      <div class="avatar">
        <img src="https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png" alt="">
      </div>
      <div class="login-info">
        <span>Hi，欢迎来到黔驴二手商城!</span>
      </div>
      <div class="btn">
        <el-button round type="danger" plain @click="login(2)">去注册</el-button>
        <el-button round type="danger" plain @click="login(1)">去登陆</el-button>
      </div>
    </div>
    <div class="container-right-buttom">
      <div @click="jump">
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31shoucang"></div>
        <div>宝贝收藏</div>
      </div>
      <div>
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31pinglun"></div>
        <div>我的会话</div>
      </div>
      <div>
        <div style="font-size: 40px; padding-left: 5px;" class="iconfont icon-31guanzhu1"></div>
        <div>我的关注</div>
      </div>
      <div>
        <div style="font-size: 40px;padding-left: 5px;" class="iconfont icon-31zuji"></div>
        <div>历史浏览</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    login(e) {
      if (e === 1) {
        this.$router.push({ name: 'login' })
      } else if (e === 2) {
        this.$router.push({ name: 'reg' })
      }
    },
    jump() {
      this.$router.push({ name: 'shopingcar' })
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
  }

  .login-info {
    position: absolute;
    top: 120px;
    left: 40px;
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
