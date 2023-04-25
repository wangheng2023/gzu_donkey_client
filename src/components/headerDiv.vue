<template>
  <div class="main">
    <header>
      <div class="top-left"><a style="color:#409EFF" href="/index">宠物商城</a></div>
      <div class="top-center">
        <ul>
          <li><a href="/index">首页</a><label>|</label></li>
          <li><a href="/shopingcar">购物车</a><label>|</label></li>
          <li>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="/userinfo">个人信息</a></el-dropdown-item>
                <el-dropdown-item><a href="/userinfo">地址</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <label>|</label>
          </li>
          <li><a href="/index">宠物中心</a><label>|</label></li>
        </ul>
      </div>
      <div class="top-right">
        <div>
          <el-avatar style="margin-right: 10px;" :size="50"
            src="https://www.pethome.com.cn/themes/chongwu/images/store/avatar.png" @error="errorHandler">
            <img src="http://donkey.yuanyexiao.cn/user/image/default/9.png" alt="" srcset="">
          </el-avatar>
        </div>
        <div>
          <el-button type="text" @click="login(1)">登录</el-button>
          <el-button type="text" @click="login(2)">注册</el-button>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
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
    errorHandler() {
      return true
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #c2bebe;

  .top-left {
    color: #3498db;
  }

  .top-center ul li {
    display: inline;
    margin-right: 10px;
    cursor: pointer;
  }

  .top-center ul li label {
    color: #eae6e6;
    margin-left: 10px;
  }

  .top-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

// section {
//   height: 1400px;
// }
</style>
