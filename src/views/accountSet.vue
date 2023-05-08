<template>
  <div>
    <headerDiv></headerDiv>
    <section class="w box">
      <div class="pageHead">
        <el-page-header @back="goBack" style="margin-right: 10px;">
        </el-page-header>
      </div>
      <div class="main-box">
        <div class="tabs">
          <el-tabs v-model="activeName" tab-position="left" type="border-card" style="min-height: 500px;">
            <el-tab-pane label="个人信息" name="first">
              <updateUserVue></updateUserVue>
            </el-tab-pane>
            <el-tab-pane label="账号管理" name="second">
              <accountBind></accountBind>
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
import accountBind from '@/components/accountBind.vue'
import updateUserVue from '@/components/updateUser.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    accountBind,
    updateUserVue
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  background-color: #fff;
  min-height: 500px;
  margin: 20px auto;
  border-radius: 18px;
}

.main-box {
  margin: 20px;
  padding-bottom: 20px;

  .tabs {
    width: 80%;
    margin: 0 auto;
    border: 1px solid #dfe4ed;
  }
}

// :deep(.el-tabs__nav-scroll) {
//   width: 250px;
// }
.pageHead {
  padding-top: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #dfe4ed;
  margin-bottom: 20px;
}
</style>
