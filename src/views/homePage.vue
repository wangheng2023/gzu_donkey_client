<template>
  <div class="main">
    <headerDiv></headerDiv>
    <section>
      <div class="sec_main">
        <indexPage></indexPage>
        <!-- <hotRecom></hotRecom> -->
      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
// import hotRecom from '@/components/hotRecom.vue' // 引入热门推荐板块
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import indexPage from '@/views/indexPage.vue' // 引入版心模块
import headerDiv from '@/components/headerDiv.vue'
export default {
  components: {
    indexPage,
    footerDiv,
    headerDiv
  }
}
</script>

<style lang="less" scoped>
section {
  height: 1400px;
}
</style>
