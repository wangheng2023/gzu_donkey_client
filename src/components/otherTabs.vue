<template>
  <div>
    <main class="w">
      <sideBar :storelist="storelist" @sonActiveTab="getActiveTab"></sideBar>
      <zmdOthers :imglist="imglist"></zmdOthers>
    </main>
  </div>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
import zmdOthers from './zmdOthers.vue'
export default {
  props: {
    storelist: {},
    imglist: {}
  },
  components: {
    sideBar,
    zmdOthers
  },
  methods: {
    getActiveTab(val) {
      this.activeTab = val
      this.$emit('getActiveTab', this.activeTab)
      console.log('othertab', this.activeTab)
    }
  }
}
</script>
<style lang="less" scoped>
main {
  position: relative;
  height: 450px;
}
</style>
