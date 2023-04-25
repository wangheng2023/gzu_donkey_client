<template>
  <div>
    <footer>
      <div class="footer">
        <div class="w">
          <div class="mod_server">
            <ul>
              <li v-for="(item, index) in footerlist" :key="index">
                <h5></h5>
                <div class="service_txt">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.content }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="mod_copyright">
            <div class="links"> <a href="">关于我们</a> | <a href="">联系我们</a> | <a href="">联系客服</a> |<a href="">商家入驻</a>
              |<a href="">营销中心</a> |<a href="">手机品优购</a> |<a href="">友情链接</a> |<a href="">销售联盟</a> |<a href="">品优购社区</a>
              |<a href="">品优购公益</a>
            </div>
            <div class="copyright">
              地址：贵州省贵阳市贵州大学 邮编：500000 电话：100-100-1000 传真：010-82935100 邮箱: chunyan_m@foxmail.com<br>
              京ICP备08001421号京公网安备110108007702
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerlist: [
        { title: '正品保障', content: '正品保障,提供发票' },
        { title: '正品保障', content: '正品保障,提供发票' },
        { title: '正品保障', content: '正品保障,提供发票' },
        { title: '正品保障', content: '正品保障,提供发票' },
        { title: '正品保障', content: '正品保障,提供发票' }]
    }
  }
}
</script>
<style lang="less" scoped>
/* 底部模块开始  */
.footer {
  width: 100%;
  height: 250px;
  background-color: #f5f5f5;
  padding-top: 30px;
  // position: absolute;
  // top: 200px
}

.mod_server {
  display: flex;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #ccc;
}

.mod_server ul li {
  float: left;
  width: 240px;
  height: 50px;
  padding-left: 30px;
}

.mod_server ul li h5 {
  float: left;
  width: 50px;
  height: 50px;
  background: url('../../public/icons.png') no-repeat -251px -3px;
  margin-right: 5px;
}

.service_txt h4 {
  font-size: 14px;
  margin: 5px 0 5px 0;
}

.service_txt p {
  font-size: 12px;
}

.mod_copyright {
  text-align: center;
  font-size: 12px;
  color: #666666;
  padding-top: 20px;
}

.links {
  margin-bottom: 15px;
}

.copyright {
  line-height: 20px;
}

.links a {
  color: #666;
  margin: 0 15px;
}

/* 底部模块 end  */
</style>
