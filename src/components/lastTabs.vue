<template>
  <div>
    <main class="w">
      <div class="search">
        <div class="search-box">
          <el-input placeholder="搜索商品名称" v-model="input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div style="font-size: 16px;margin-right: 20px; cursor: pointer;">全部商品</div>
      </div>
      <div>
        <hotCard :hotlist="hotlist"></hotCard>
        <footer class="footer">
          <div class="fenye">
            <el-pagination background layout="prev, pager, next" :total="500"></el-pagination>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>
<script>
import hotCard from './hotCard.vue'
export default {
  components: {
    hotCard
  },
  props: {
    input1: {}
  },
  data() {
    return {
      input: '',
      hotlist: [
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' }]
    }
  },
  watch: {
    input1: {
      handler(newVal, oldVal) {
        this.input = this.input1
      }
    }
  }
}
</script>
<style lang="less" scoped>
main {
  position: relative;
  width: 100%;
  // height: 450px;
  background-color: #fff;

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #EE356C;

    .search-box {
      width: 30%;
      margin-left: 20px;
    }
  }
}

.footer {
  height: 180px;

  .fenye {
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #EE356C !important; //修改默认的背景色
  }
}
</style>
