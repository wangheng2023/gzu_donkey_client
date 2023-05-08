<template>
  <div class="main">
    <headerDiv></headerDiv>
    <section>
      <div class="sec_main">
        <searchDiv></searchDiv>
        <indexTabs></indexTabs>
        <hotRecom></hotRecom>
        <footerDiv></footerDiv>
      </div>
    </section>
  </div>
</template>
<script>
import searchDiv from '@/components/searchDiv.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'
import indexTabs from '@/components/indexTabs.vue'
import hotRecom from '@/components/hotRecom.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    indexTabs,
    searchDiv,
    hotRecom
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped></style>
