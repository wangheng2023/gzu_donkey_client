import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/homePage.vue'
// import hellow from '../components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/moregoods', name: 'moregoods', component: () => import('@/components/lastTabs.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/userLogin.vue') },
  { path: '/reg', name: 'reg', component: () => import('@/views/userReg.vue') },
  { path: '/index', name: 'index', component: index, children: [] },
  { path: '/gooddetail', name: 'gooddetail', component: () => import('@/views/goodDetail.vue') },
  { path: '/savedetail', name: 'savedetail', component: () => import('@/views/saveDetail.vue') },
  { path: '/userinfo', name: 'userinfo', component: () => import('@/views/userInfo.vue') },
  { path: '/userinfother', name: 'userinfother', component: () => import('@/views/userInfoOther.vue') },
  { path: '/shopingcar', name: 'shopingcar', component: () => import('@/views/shopingCar.vue') },
  { path: '/mydialog', name: 'mydialog', component: () => import('@/views/myDialog.vue') },
  { path: '/accountset', name: 'accountset', component: () => import('@/views/accountSet.vue') },
  { path: '/pubgood', name: 'pubgood', component: () => import('@/views/pubGood.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
