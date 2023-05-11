<template>
  <div>
    <el-container class="home_container" direction=" horizontal">
      <!-- 头部区域 -->
      <el-header>
        <span>黔驴二手交易平台</span>
        <div>
          <span>管理员，欢迎您！</span>
          <el-button type="info" @click="signout" class="el-button">退出登录</el-button>
        </div>
      </el-header>

      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <el-menu active-text-color="#409EFF" background-color="#545c64" class="el-menu-vertical-demo"
            default-active="/managestudent" text-color="#fff" router>
            <!-- 一级标签 -->
            <el-menu-item index="/manageuser">
              <el-icon>
                <Operation />
              </el-icon>用户管理
            </el-menu-item>
            <el-menu-item index="/managegood">
              <el-icon>
                <House />
              </el-icon>商品管理
            </el-menu-item>
            <el-menu-item index="/managerorder">
              <el-icon>
                <Guide />
              </el-icon>学院管理
            </el-menu-item>
            <el-menu-item index="/manageclass">
              <el-icon>
                <UserFilled />
              </el-icon>分类管理
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    async signout() {
      // window.sessionStorage.removeItem('managerid')
      await this.$axios.get('/admin/logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 610px;

  :deep(.el-header) {
    background-color: #50545f;
    font-size: 18px;
    display: flex;
    justify-content: space-between; // 让header的两个元素两端对齐
    align-items: center; // 让元素垂直居中

    span {
      color: #fff;
    }

    .el-button {
      font-size: 16px;
    }
  }

  .el-aside {
    height: 100%;
    background-color: #545c64;
    color: #333;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #e5e8ea;
    color: #333;
  }
}
</style>
