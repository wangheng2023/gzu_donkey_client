<template>
  <div>
    <el-container class="home_container" direction=" horizontal">
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <el-menu active-text-color="#409eff" background-color="#fff" class="el-menu-vertical-demo"
          :default-active="defaultActive" text-color="#333" router>
          <!-- 一级标签 -->
          <el-menu-item v-for="(item, index1) in realmenu" :key="index1" :index="item.path">{{ item.meta.name }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部区域 -->
        <el-header style="margin:8px 20px 0 20px;border-radius: 5px;">
          <span>黔驴二手交易平台</span>
          <div>
            <span>管理员，欢迎您！</span>
            <el-button type="text" @click="signout" class="el-button">退出登录</el-button>
          </div>
        </el-header>

        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { recursionRouter } from '@/utils/recursion-router'
import DynamicRouters from '@/router/DynamicRouters'
export default {
  data() {
    return {
      menu: JSON.parse(window.sessionStorage.getItem('permission')),
      realmenu: [],
      defaultActive: ''
    }
  },
  created() {
    this.judeg()
  },
  methods: {
    async signout() {
      // window.sessionStorage.removeItem('managerid')
      await this.$axios.get('/admin/logout')
      this.$router.push({ name: 'login' })
    },
    judeg() {
      const realRouter = recursionRouter(this.menu, DynamicRouters)
      this.realmenu = realRouter
      this.defaultActive = this.realmenu[0].path
      console.log('this.defaultActive', this.defaultActive)
      const main = this.$router.options.routes.find(v => v.path === '/homemanager')
      main.redirect = this.defaultActive
      console.log(main)
      // const children = main.children
      // console.log(this.$router)
      // 添加动态路由
      //   main.redirect = children[0].path
      //   children.push(...realRouter)
      //   this.$router.matcher.addRoutes(children)
      //
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 710px;

  :deep(.el-header) {
    background-color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: space-between; // 让header的两个元素两端对齐
    align-items: center; // 让元素垂直居中

    span {
      color: #333;
    }

    .el-button {
      font-size: 16px;
    }
  }

  .el-aside {
    height: 100%;
    // background-color: #545c64;
    background-color: #fff;
    color: #333;

    .el-menu {
      border-right: none;

      :deep(.el-menu-item .is-active) {
        background-color: #b3d8ff;
      }
    }
  }

  .el-main {
    background-color: #e5e8ea;
    color: #333;
  }
}
</style>
