<template>
  <div>
    <div class="hot-list">
      <el-row>
        <el-col :span="5" v-for="(item, index) in hotlist" :key="index" style="margin-left: 40px;margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="item.img" class="image">
            <div class="detail" @click="toDetail(item)">
              <label for="">{{ item.price }}</label><br>
              <span class="scrib">{{ item.decri }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="hot-list">
      <el-row>
        <el-col :span="5" v-for="(item, index) in likelist" :key="index" style="margin-left: 40px;margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="item.img" class="image">
            <div class="detail" @click="toDetail(item)">
              <label for="">{{ item.price }}</label><br>
              <span class="scrib">{{ item.decri }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
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
      console.log(111)
      this.$router.push({ name: 'gooddetail', params: { id: item.price, detail: item } })
    }
  }
}
</script>
<style lang="less" scoped>
.hot-list {
  .image {
    width: 200px;
    margin-left: 25px;
    margin-top: 10px;
  }

  .detail {
    position: relative;
    width: 250px;
    text-align: center;
    padding: 8px 0;
    cursor: pointer;

    label {
      font-size: 16px;
      color: #FD5F8E;

    }

    .scrib {
      display: inline-block;
      margin-top: 8px;
    }

    .bottom {
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: rgb(241, 194, 202);
      margin-top: 5px;
      cursor: pointer;
    }
  }

}
</style>
