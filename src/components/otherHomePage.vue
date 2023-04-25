<template>
  <div class="main">
    <header>
      <div class="top-left">宠物商城</div>
      <div class="top-center">
        <ul>
          <li v-for="(item, index) in linklist" :key="index">{{ item.label }}<label>|</label></li>
        </ul>
      </div>
      <div class="top-right">
        <el-button type="text" @click="login(1)">登录</el-button>
        <el-button type="text" @click="login(2)">注册</el-button>
      </div>
    </header>
    <section>
      <div class="sec_main">

      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
export default {
  components: {
    footerDiv
  },
  data() {
    return {
      linklist: [{ label: '主页' }, { label: '购物车' }, { label: '主页' }, { label: '购物车' }]
    }
  },
  methods: {
    login(e) {
      if (e === 1) {
        this.$router.push({ name: 'login' })
      } else if (e === 2) {
        this.$router.push({ name: 'reg' })
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
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #c2bebe;

  .top-left {
    color: #3498db;
  }

  .top-center ul li {
    display: inline;
    margin-right: 10px;
  }

  .top-center ul li label {
    color: #eae6e6;
    margin-left: 10px;
  }
}

section {
  height: 610px;
}
</style>
