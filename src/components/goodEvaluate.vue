<template>
  <div>
    <div class="evabox">
      <ul>
        <li class="evalist" v-for="(item, index) in evalist" :key="index">
          {{ item.speak }}
          <div class="evaItem">
            <div class="evaItem-left">
              <el-avatar size="large" :src="circleUrl"></el-avatar>
            </div>
            <div class="evaItem-right">
              <el-button type="text">回复</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      evalist: [{ speak: 'vvv' }, { speak: 'vvv' }, { speak: 'vvv' }]
    }
  }
}
</script>
<style lang="less" scoped>
.evabox {
  margin: 20px 50px;
}

.evalist {
  display: inline-block;
  width: 100%;
  height: 70px;
  border: 1px solid #333;
}

.evaItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
