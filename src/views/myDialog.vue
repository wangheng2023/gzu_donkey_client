<template>
  <div>
    <headerDiv></headerDiv>
    <div class="w">
      <div class="pageHead">
        <el-page-header @back="goBack" content="我的会话" style="margin-right: 10px;">
        </el-page-header>
      </div>
      <div class="tabs">
        <el-tabs style="height: 550px;" type="border-card" tab-position="left">
          <el-tab-pane v-for="(item, index) in perlist" :key="index">
            <div slot="label">
              <div class="msgtitle">
                <img :src="item.img" alt="">
                <div class="title-right">
                  <h3>{{ item.nikename }}</h3>
                  <label for="">{{ change(item.time) }}</label>
                  <span class="firstmsg">{{ item.first }}</span>
                </div>
              </div>
            </div>
            <div class="chatbox">
              <div class="chatbox_top">
                <ul>
                  <li v-for="(item, index) in perlist" :key="index">
                    <div class="chatmsg">
                      <div class="chatmsg_top">
                        <h3>{{ item.nikename }}</h3>
                        <label for="">{{ item.time }}</label>
                      </div>
                      <span>{{ item.first }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="chatbox_send">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
                </el-input>
                <div class="btn">
                  <el-button type="primary" plain>发送</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import headerDiv from '@/components/headerDiv.vue'
import footerDiv from '@/components/footerDiv.vue' // 引入底部模块
// import { changeTime } from '@/utils/changetime'
export default {
  components: {
    headerDiv,
    footerDiv
  },
  data() {
    return {
      textarea: '',
      perlist: [
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/501.png',
          nikename: '发疯的傻子',
          first: '不能再低了',
          time: '12:06'
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/401.png',
          nikename: 'f啊发撒子',
          first: '不能再低了',
          time: '22:06'
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/301.png',
          nikename: '山寨版',
          first: '不能再低了',
          time: '4.23'
        },
        {
          img: 'http://donkey.yuanyexiao.cn/user/image/default/201.png',
          nikename: '库衣服',
          first: '不能再低了',
          time: '4.22'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    change(val) {
      const dateold = new Date(val)
      const date = new Date().getTime()
      const str = new Date(date)
      // console.log(str)
      if (str.getMonth() === dateold.getMonth() && str.getDate() === dateold.getDate()) {
        const h = dateold.getHours() + ':'
        const m = dateold.getMinutes()
        return h + m
      } else if (str.getMonth() === dateold.getMonth() && str.getDate() - dateold.getDate() === 1) {
        return '昨天'
      } else {
        const M = dateold.getMonth() + 1
        const D = dateold.getDate()
        return M + '.' + D
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pageHead {
  padding-top: 10px;
  padding-left: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  //border-bottom: 1px solid #EE356C;
  border-radius: 18px;
}

.tabs {
  margin: 20px 0;
  border-radius: 18px;
  overflow: hidden;

  :deep(.el-tabs__nav-scroll) {
    width: 300px;
  }

  :deep(.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left) {
    text-align: left;
    height: 90px;
    margin: 10px;
  }

  .msgtitle {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 10px 0;

    .title-right {
      position: relative;
      width: 190px;
      height: 80px;
      // border: 1px solid #333;
      margin-left: 8px;

      h3 {
        margin-top: 8px;
      }

      .firstmsg {
        display: inline-block;
        width: 100%;
        margin-top: -12px;
        overflow: hidden;
        color: #a7a5a5;
      }

      label {
        position: absolute;
        top: 8px;
        right: 5px;
        color: #a7a5a5;
      }
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 60px;
      margin-left: -10px;
    }

  }

  .chatbox {
    width: 100%;
    height: 520px;
    border-radius: 18px;
    //border: 1px solid #a3a1a1;

    .chatbox_top {
      width: 100%;
      height: 75%;
      //padding: 0 20px;
      //border: 1px solid #333;

      .chatmsg {
        width: 100%;
        //border: 1px solid #333;
        margin-bottom: 15px;

        span {
          font-size: 16px;
        }

        .chatmsg_top {
          display: flex;
          justify-content: left;
          font-size: 12px;

          label {
            margin-left: 20px;
            color: #008040;
          }

          h3 {
            color: #0000ff;
          }
        }
      }
    }

    .chatbox_send {
      position: relative;
      width: 100%;
      height: 25%;
      border: 1px solid #b5b2b2;

      .btn {
        position: absolute;
        top: 80px;
        right: 10px;
      }
    }
  }
}
</style>
