<template>
  <div class="main">
    <header>
      <div class="w nav">
        <div class="top-left">
          <div v-if="userinfo.id !== ''">
            <el-button style="font-size: 12px;" type="text" @click="logout">退出登录</el-button>
          </div>
          <div v-else>
            <a style="color:#409EFF;margin-left: 20px;" href="/cdonkey/login">请登录</a>
          </div>
        </div>
        <div class="top-right">
          <ul>
            <li><a href="/cdonkey/index">首页</a><label>|</label></li>
            <li><a href="javascript:void(0)" @click="toShopingcar('shopingcar')">收藏夹</a><label>|</label></li>
            <li>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><a href="javascript:void(0)"
                      @click="toShopingcar('userinfo')">个人主页</a></el-dropdown-item>
                  <el-dropdown-item><a href="javascript:void(0)"
                      @click="toShopingcar('accountset')">账号设置</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <label>|</label>
            </li>
            <li><a href="/cdonkey/index">我的黔驴</a><label>|</label></li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      userinfo: { imageUrl: '', id: '' }
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.id = window.sessionStorage.getItem('userid') || 0
    console.log(window.sessionStorage.getItem('userid'))
    this.getUserInfo()
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
    },
    // 一进入页面查看用户是否登录
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/user/getCustomerInfo')
      if (res.code === 200) {
        this.userinfo = res.data
        console.log('this.userinfo', res.data)
      }
    },
    // 点击跳转前判断是否登录
    toShopingcar(path) {
      const str = document.cookie
      const reg = /ticket/
      if (!reg.test(str)) {
        this.$confirm('您还未登录，请先登录', '提示', {
          confirmButtonText: '去登录',
          cancelButtonText: '先逛逛',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: 'login' })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$router.push({ name: path })
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
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #c2bebe;

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top-left {
    color: #3498db;

    .chioce {
      position: relative;
      display: inline-block;
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px;
      background-color: #fff;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      min-width: 150px;

      select {
        display: none;
      }
    }
  }

  .top-right ul li {
    display: inline;
    margin-right: 10px;
    cursor: pointer;
  }

  .top-right ul li label {
    color: #eae6e6;
    margin-left: 10px;
  }
}
</style>
