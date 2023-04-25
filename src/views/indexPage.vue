<template>
  <div>
    <nav>
      <div class="w">
        <div class="container">
          <div class="categorys">全部商品分类</div>
          <div class="nav-main">
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-class="my-tabs-header">
              <el-tab-pane label="首页" name="first">
                <indexTabs @getActiveTab="getActiveTab"></indexTabs>
              </el-tab-pane>
              <el-tab-pane label="喵星馆" name="second">
                <otherTabs :storelist="storelist" :imglist="imglist_cat" @getActiveTab="getActiveTab"></otherTabs>
              </el-tab-pane>
              <el-tab-pane label="汪星馆" name="third">
                <otherTabs :storelist="storelist" :imglist="imglist_dog" @getActiveTab="getActiveTab"></otherTabs>
              </el-tab-pane>
              <el-tab-pane label="宠主馆" name="fourth">
                <otherTabs :storelist="storelist" :imglist="imglist_own" @getActiveTab="getActiveTab"></otherTabs>
              </el-tab-pane>
              <el-tab-pane label="更多商品" name="five">
                <lastTabs :input1="input"></lastTabs>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </nav>
    <div class="hotbox">
      <hotRecom :activeName="activeName"></hotRecom>
    </div>
  </div>
</template>
<script>
import hotRecom from '@/components/hotRecom.vue' // 引入热门推荐板块
import indexTabs from '@/components/indexTabs.vue'
import otherTabs from '@/components/otherTabs.vue'
import lastTabs from '@/components/lastTabs.vue'
export default {
  components: {
    indexTabs,
    otherTabs,
    lastTabs,
    hotRecom
  },
  data() {
    return {
      activeName: 'first',
      input: '',
      storelist: [
        { title: '喵星馆', content: [111, 222, 333] },
        { title: '汪星馆', content: [111, 222, 333] },
        { title: '宠主馆', content: [111, 222, 333] }],
      imglist_cat: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/a22645df3f07d41cc351d33b75e26633.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/d75bf4e276560d2590e94d1bb25ed672.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/c425f923549f1e940d80bedc42622dd3.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190910/13652ba89cada9454f5d668741ccbbcb.jpg'],
      imglist_dog: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190911/b3a531850a6b1d827d61019e87c8a063.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190911/a4ddb58e26270dc9704e8f88a7159746.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190911/22794d40c305d5ac30c1dcaf82b99149.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190911/b30d46a3a58e34014e73ea7e6d1ecba8.jpg'
      ],
      imglist_own: ['https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190912/f5ff6e9bad97cd758484ac9ab5f3a911.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190912/5a3eabd530ce72fcd8f7d4aa694b3018.jpg',
        'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20190912/d472c4a207d1534212402a72d8e0a871.jpg'
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.name)
      sessionStorage.setItem('activeTab', this.activeName)
      console.log('indexpage', this.activeName, 'sessionStorage', sessionStorage.getItem('activeTab'))
    },
    getActiveTab(val) {
      this.activeName = val.activeTab
      this.input = val.input
      sessionStorage.setItem('activeTab', this.activeName)
      console.log('input', this.input)
      console.log('indexpage', this.activeName, 'sessionStorage', sessionStorage.getItem('activeTab'))
    }
  }
}
</script>
<style lang="less" scoped>
nav {
  width: 100%;
  height: 40px;
  // margin-top: 20px;
  border-bottom: 2px solid #EE356C;
  background-color: #fff;

  .categorys {
    float: left;
    width: 232px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #EE356C;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }

  .nav-main ul li {
    line-height: 40px;
    display: inline;
    margin-left: 40px;
  }

  :deep(.el-tabs__header) {
    margin: 0 0 1px;
  }

  :deep(.el-tabs__item.is-active) {
    color: #EE356C;
  }

  /*tabs 去掉el-tab-pane的下划线*/
  :deep(.el-tabs__nav-wrap::after) {
    position: static !important;
  }

  /*tabs 去掉el-tab-pane切换时的蓝色下划线*/
  :deep(.el-tabs__active-bar) {
    background-color: transparent !important;
  }

  :deep(.el-tabs__item:hover) {
    color: #EE356C;
  }

  :deep(.el-tabs__item) {
    margin-left: 30px;
    /*设置标签头左边距*/
  }
}
</style>
