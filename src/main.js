import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入element样式
import '@/assets/global.css' // 全局引入css文件
import '@/assets/font_m2unhwe4ww/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:9090/pet' // 设置全局默认值
axios.defaults.timeout = 5000 // 设置5秒超时时间
Vue.prototype.$axios = axios
// 在每次请求中添加 CORS 头部
// axios.interceptors.request.use(function (config) {
//   config.headers['Access-Control-Allow-Origin'] = '*'
//   config.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,PUT,DELETE'
//   config.headers['Access-Control-Allow-Headers'] = 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'
//   config.headers['Access-Control-Allow-Credentials'] = 'true'
//   config.headers['Access-Control-Expose-Headers'] = 'Content-Length,Content-Type'
//   return config
// })
// axios.defaults.withCredentials = true;

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
