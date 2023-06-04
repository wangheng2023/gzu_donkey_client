import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/homePage.vue'
// import hellow from '../components/HelloWorld'
import homemanager from '@/views/manager/homeManager.vue'
import managerindex from '@/views/manager/ManagerIndex.vue'
// import distribute from '@/views/manager/ClassDistribute.vue'
import manageclass from '@/views/manager/manageClass.vue'
import managestudent from '@/views/manager/manageStudent.vue'
import manageteacher from '@/views/manager/manageTeacher.vue'
import manageinsider from '@/views/manager/manageInsider.vue'

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
  { path: '/attentionpage', name: 'attentionpage', component: () => import('@/views/AttentionPage.vue') },
  { path: '/mydialog', name: 'mydialog', component: () => import('@/views/myDialog.vue') },
  { path: '/accountset', name: 'accountset', component: () => import('@/views/accountSet.vue') },
  { path: '/pubgood', name: 'pubgood', component: () => import('@/views/pubGood.vue') },
  { // 管理员页面
    path: '/homemanager',
    name: 'homemanager',
    component: homemanager,
    redirect: '/manageuser',
    children: [
      { path: '/managerorder', name: 'managerorder', component: managerindex },
      { path: '/manageclass', name: 'manageclass', component: manageclass },
      { path: '/manageuser', name: 'manageuser', component: managestudent },
      { path: '/managegood', name: 'managegood', component: manageteacher },
      { path: '/manageinsider', name: 'manageinsider', component: manageinsider }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
