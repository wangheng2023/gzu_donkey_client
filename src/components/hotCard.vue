<template>
  <div>
    <div class="hot-list">
      <el-row>
        <el-col :span="8" v-for="(item, index) in hotlist" :key="index" style="margin-top: 20px;">
          <div class="goodbox" @click="toDetail(item.id)">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img v-if="item.goodsPicInfos[0]?.isMaster === 1" :src="item.goodsPicInfos[0]?.picUrl" alt="加载失败"
                class="image" />
              <el-empty v-else description="暂无图片" :image-size="100" class="image"></el-empty>
              <div class="detail">
                <h3>{{ item.goodsName }}</h3>
                <span class="scrib">{{ item.descript }}</span>
                <label for="">￥{{ item.price }}</label>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hotlist: {},
    likelist: {}
  },
  data() {
    return {
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({ path: 'gooddetail', query: { id: item } })
    }
  }
}
</script>
<style lang="less" scoped>
.hot-list {
  .goodbox {
    width: 348px;
    height: 190px;
    margin-left: 25px;
    border-radius: 12px;
    padding: 8px 0;
  }

  .goodbox:hover {
    border: 1px solid #ff5000;
  }

  .image {
    float: left;
    height: 150px;
    width: 150px;
    //margin-left: 10px;
    margin: 10px;
  }

  .detail {
    //float: right;
    display: inline-block;
    position: relative;
    width: 170px;
    text-align: center;
    padding: 10px 0 0 0;
    cursor: pointer;

    h3 {
      text-align: left;
    }

    label {
      position: absolute;
      top: 140px;
      left: 10px;
      font-size: 16px;
      color: #FD5F8E;

    }

    .scrib {
      text-align: left;
      display: inline-block;
      margin-top: 8px;
    }
  }

}
</style>
