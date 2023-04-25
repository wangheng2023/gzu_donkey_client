<template>
  <div>
    <headerDiv></headerDiv>
    <section>
      <div class="w infobox">
        <userInfomation></userInfomation>
        <addressInfo></addressInfo>
      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'
import userInfomation from '@/components/userInfomation.vue'
import addressInfo from '@/components/addressInfo.vue'
export default {
  components: {
    footerDiv,
    headerDiv,
    userInfomation,
    addressInfo
  },
  data() {
    return {

    }
  },
  methods: {
    changeuserinfo() { }
  }
}
</script>
<style lang="less" scoped>
section {
  height: 550px;
}

.infobox {
  height: 550px;
  background-color: #fff;
}
</style>
