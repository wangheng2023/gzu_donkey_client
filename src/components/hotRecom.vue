<template>
  <div>
    <div class="w container" :class="activeName == 'five' ? 'none' : 'black'">
      <div class="w">
        <div class="hot-title">
          <span>热门推荐</span>
        </div>
        <div class="hot-list">
          <hotCard :hotlist="hotlist"></hotCard>
        </div>
      </div>
      <div class="white"></div>
    </div>
  </div>
</template>
<script>
import hotCard from './hotCard.vue'
export default {
  components: {
    hotCard
  },
  props: {
    activeName: {}
  },
  data() {
    return {
      activeTab: this.activeName,
      hotlist: [
        {
          img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: '123元',
          decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋'
        },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' },
        { img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', price: '123元', decri: '好吃的大面筋，不一样的滋味，烤面筋，烤面筋，我的烤面筋' }]
    }
  },
  watch: {
    activeTab: {
      handler(newVal, oldVal) {
        console.log('newVal', newVal, 'oldVal', oldVal)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
  },
  created() {
    this.gethotList()
  },
  methods: {
    async gethotList() {
      const { data: res } = await this.$axios.get('goods/getGoodsNew')
      if (res.code === 200) {
        this.hotlist = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.none {
  display: none;
}

.black {
  display: block;
}

.container {
  background-color: #fff;
  border-radius: 18px;

  .hot-title {
    height: 60px;
    width: 100%;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 2px solid #EE356C;

    span {
      font-size: 20px;
    }
  }

  .hot-list {}

  .white {
    height: 100px;
    width: 100%;
    background-color: #fff;
  }
}
</style>
