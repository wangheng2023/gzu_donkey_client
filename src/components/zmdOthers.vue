<template>
  <div>
    <div class="container-center">
      <el-carousel :autoplay="false" trigger="click" arrow="always" height="400px">
        <el-carousel-item v-for="item in imglist" :key="item">
          <img :src="item.picUrl" alt="">
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
  width: 800px;
  height: 450px;
  // background-color: pink;

  img {
    width: 800px;
    height:400px;
    margin:0 auto;
  }
}
</style>
