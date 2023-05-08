<template>
  <div>
    <div class="main">
      <h3>账号绑定</h3>
      <div class="zhlist">
        <ul>
          <li v-for="(item, index) in zhlist" :key="index">
            <div class="zhitem">
              <div class="left">
                <div class="icon el-icon-circle-check"></div>
                <div style="margin-left: 30px;">
                  <div class="content">
                    {{ item.cate }}
                  </div>
                  123456
                </div>
              </div>
              <div class="btn">
                <el-button type="text">修改</el-button>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zhlist: [
        { cate: '手机号' },
        { cate: '邮箱' },
        { cate: '密码' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.zhlist {
  width: 80%;
  height: 400px;
  margin-top: 20px;
  margin-left: 20px;
}

ul li {
  display: inline-block;
  width: 100%;
}

:deep(.el-icon-circle-check:before) {
  color: rgb(16, 233, 95);
  font-weight: 700;
}

.zhitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fafafa;
  margin-bottom: 15px;
  border-radius: 18px;

  .left {
    display: flex;
    justify-content: left;
    align-items: center;

    .icon {
      margin-left: 20px;
    }
  }

  .btn {
    margin-right: 20px;
  }
}
</style>
