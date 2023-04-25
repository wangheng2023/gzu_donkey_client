<template>
  <div>
    <div class="store_slier">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in storelist" :key="index">
          <el-tag type="danger" v-for="(item1, index) in item.content" :key="index" style="margin: 10px 0 0 10px;">
            <el-link type="danger" :underline="false" @click="toMore(item1)">
              <label class="tags">{{ item1 }}</label> </el-link>
          </el-tag>
        </el-collapse-item>
      </el-collapse>
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
      }
    }
  },
  methods: {
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
  width: 232px;
  height: 450px;
  background-color: #FD5F8E;

  .tags {
    color: #f56c6c;
    cursor: pointer;
  }

  // 手风琴样式
  :deep(.el-collapse-item__header) {
    color: #fff;
    background-color: #FD5F8E;
    padding-left: 20px;
  }

  :deep(.el-collapse-item__wrap) {
    background-color: rgba(255, 192, 203, 0.9)
  }

  :deep(.el-icon-arrow-right:before) {
    color: #fff;
  }
}
</style>
