<template>
  <div>
    <div class="store_slier">
      <!-- <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in storelist" :key="index">
          <el-tag type="danger" v-for="(item1, index) in item.content" :key="index" style="margin: 10px 0 0 10px;">
            <el-link type="danger" :underline="false" @click="toMore(item1)">
              <label class="tags">{{ item1 }}</label> </el-link>
          </el-tag>
        </el-collapse-item>
      </el-collapse> -->
      <h3>分类</h3>
      <ul>
        <li v-for="(item, index) in testlist" :key="index" @click="jump(item)">
          <span v-if="index % 3 == 0">
            <i :class="icon[index / 3]"></i>
          </span>
          {{ item }} <label for=""> / </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    storelist: {
      // default: [{ title: '喵星馆', content: [111, 222, 333] }, { title: '汪星馆', content: [111, 222, 333] }, { title: '宠主馆', content: [111, 222, 333] }]
    }
  },
  data() {
    return {
      activeName: '',
      searchlist: {
        input: '',
        activeTab: ''
      },
      icon: ['iconfont icon-xie', 'iconfont icon-jiafangjiashi ', 'iconfont icon-huazhuangpin', 'iconfont icon-shumashouji', 'iconfont icon-xiebao ', 'iconfont icon-nanzhuang'],
      testlist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 15, 41, 69, 8, 25, 26]
    }
  },
  methods: {
    jump(item) {
      this.$router.push({ name: 'moregoods', params: { input: item } })
      console.log(item)
    },
    // 子传父
    toMore(item1) {
      this.searchlist.activeTab = 'five'
      this.searchlist.input = item1
      this.$emit('sonActiveTab', this.searchlist)
      console.log(this.searchlist)
    }
  }

}
</script>
<style lang="less" scoped>
.store_slier {
  position: relative;
  float: left;
  width: 250px;
  height: 370px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #F7F9FA;
  padding-top: 20px;
  padding-left: 20px;

  ul li {
    display: inline-block;
    width: 60px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    color: #666;
    margin-bottom: 18px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 18px;
  }

  .tags {
    color: #f56c6c;
    cursor: pointer;
  }

  // 手风琴样式
  :deep(.el-collapse-item__header) {
    color: #333;
    background-color: #F7F9FA;
    padding-left: 20px;
  }

  :deep(.el-collapse-item__wrap) {
    background-color: rgba(255, 192, 203, 0.9)
  }

  :deep(.el-icon-arrow-right:before) {
    color: #333;
  }
}
</style>
