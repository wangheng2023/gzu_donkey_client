<template>
  <div class="main">
    <headerDiv></headerDiv>
    <section>
      <div class="sec_main">
        <div class="w detail-box">
          <div class="pageHead">
            <el-page-header @back="goBack" content="救助金详情" style="margin-left: 10px;"></el-page-header>
          </div>
          <div>
            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            <div class="lr">
              <div class="left">
                <div style="margin:0 0 10px 20px; font-size: 15px; color:#EE356C;">总救助金去向</div>
                <el-timeline>
                  <el-timeline-item :color="color" :timestamp="item.time" placement="top"
                    v-for="(item, index) in savelist" :key="index">
                    <el-card>
                      <h4>{{ item.title }}</h4>
                      <p>{{ item.content }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div class="right">
                <div style="margin:0 0 10px 20px; font-size: 15px; color:#EE356C;">您提供的救助金</div>
                <el-timeline>
                  <el-timeline-item :color="color" :timestamp="item.time" placement="top"
                    v-for="(item, index) in savelist" :key="index">
                    <el-card>
                      <h4>{{ item.title }}</h4>
                      <p>{{ item.content }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
import headerDiv from '@/components/headerDiv.vue'
export default {
  components: {
    footerDiv,
    headerDiv
  },
  data() {
    return {
      color: '#ee8243',
      savelist: [
        { time: '2018/4/12', title: '更新 Github 模板', content: '我在贵州大学北校区二栋更新 Github 模板' },
        { time: '2018/4/12', title: '更新 Github 模板', content: '我在贵州大学北校区二栋更新 Github 模板' },
        { time: '2018/4/12', title: '更新 Github 模板', content: '我在贵州大学北校区二栋更新 Github 模板' },
        { time: '2018/4/12', title: '更新 Github 模板', content: '我在贵州大学北校区二栋更新 Github 模板' },
        { time: '2018/4/12', title: '更新 Github 模板', content: '我在贵州大学北校区二栋更新 Github 模板' }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
section {
  height: 750px;
}

.detail-box {
  height: 740px;
  background-color: #fff;

  .pageHead {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #EE356C;
  }

  :deep(.el-carousel__indicators--outside) {
    margin-top: -50px;
  }

  .lr {
    display: flex;
    justify-content: space-between;

    .left {
      overflow: hidden;
      width: 49%;
      height: 640px;
      padding: 0 10px;
      border-right: 1px solid #333;
    }

    .right {
      overflow: scroll;
      width: 49%;
      height: 640px;
      padding: 0 10px;
      border-left: 1px solid #333;
    }
  }
}
</style>
