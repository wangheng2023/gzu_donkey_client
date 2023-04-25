<template>
  <div>
    <div class="container-center">
      <el-carousel height="450px">
        <el-carousel-item v-for="item in imglist" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imglist: {}
  }
}
</script>
<style lang="less" scoped>
.container-center {
  float: left;
  width: 948px;
  height: 450px;
  background-color: pink;

  img {
    height: 450px;
  }
}
</style>
