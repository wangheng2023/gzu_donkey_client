<template>
  <div>
    <div class="hot-list">
      <el-row>
        <el-col :span="8" v-for="(item, index) in hotlist" :key="index" style="margin-top: 20px;">
          <div class="goodbox" @click="toDetail(item)">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="item.img" class="image">
              <div class="detail">
                <h3>烤面筋</h3>
                <span class="scrib">{{ item.decri }}</span>
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
      console.log(111)
      this.$router.push({ name: 'gooddetail', params: { id: item.price, detail: item } })
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
