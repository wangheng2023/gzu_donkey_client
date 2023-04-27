<template>
  <div class="main">
    <header>
      <div class="w nav">
        <div class="top-left">
          <!-- <el-dropdown trigger="click">
            <span class="el-dropdown-link">{{ selected ? selected : '校区' }}<i
                class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" v-model="selected" @command="handleCommand">
              <el-dropdown-item command="西区"><a href="">西区</a></el-dropdown-item>
              <el-dropdown-item command="东区"><a href="">东区</a></el-dropdown-item>
              <el-dropdown-item command="南区"><a href="">南区</a></el-dropdown-item>
              <el-dropdown-item command="不限"><a href="">不限</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <a style="color:#409EFF;margin-left: 20px;" href="/login">请登录</a>
        </div>
        <div class="top-right">
          <ul>
            <li><a href="/index">首页</a><label>|</label></li>
            <li><a href="/shopingcar">收藏夹</a><label>|</label></li>
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
            <li><a href="/index">我的黔驴</a><label>|</label></li>
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
