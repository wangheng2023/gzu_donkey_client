<template>
  <div>
    <div class="w search-box">
      <div class="search-left">
        <img style="height: 150px; margin-top: -20px;" src="../../public/removebg.png" alt="">
      </div>
      <div class="search-right">
        <div class="search-input">
          <el-input placeholder="请输入搜索内容" v-model="input" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="校区">
              <el-option label="北区" value="1"></el-option>
              <el-option label="西区" value="2"></el-option>
              <el-option label="东区" value="3"></el-option>
              <el-option label="南区" value="4"></el-option>
              <el-option label="不限" value="5"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="likeSearch"></el-button>
          </el-input>
        </div>
      </div>
      <div class="fbgood">
        <el-button type="danger" plain @click="toJudge('pubgood')">发布商品</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      select: '5'

    }
  },
  methods: {
    // 点击跳转前判断是否登录
    toJudge(path) {
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
    // 模糊搜索
    likeSearch() {
      this.$router.push({ name: 'moregoods', query: { area: this.select, input: this.input } })
    }
  }
}
</script>
<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-left {
    display: flex;
    justify-content: center;
    width: 20%;
    height: 100px;

    img {
      height: 100px;
    }
  }

  .search-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100px;
    margin-right: 130px;

    .search-input {
      width: 80%;
      height: 42px;
      border-radius: 100px !important;
      border: 2px solid #FF5000;
      overflow: hidden;
    }

    :deep(.el-input-group__append, .el-input-group__prepend) {
      background-color: rgb(241, 180, 180);
    }
  }

  .fbgood {
    margin-right: 20px;
  }

  :deep(.el-button--danger.is-plain) {
    border-radius: 20px;
  }

  :deep(.el-select .el-input) {
    width: 80px;
  }
}
</style>
