import managerindex from '@/views/manager/ManagerIndex.vue'
import manageclass from '@/views/manager/manageClass.vue'
import managestudent from '@/views/manager/manageStudent.vue'
import manageteacher from '@/views/manager/manageTeacher.vue'
import manageinsider from '@/views/manager/manageInsider.vue'

const DynamicRouters = [
  { path: '/managerorder', name: 'managerorder', component: managerindex, meta: { name: '学院管理' } },
  { path: '/manageclass', name: 'manageclass', component: manageclass, meta: { name: '分类管理' } },
  { path: '/manageuser', name: 'manageuser', component: managestudent, meta: { name: '用户管理' } },
  { path: '/managegood', name: 'managegood', component: manageteacher, meta: { name: '商品管理' } },
  { path: '/manageinsider', name: 'manageinsider', component: manageinsider, meta: { name: '权限管理' } }

]

export default DynamicRouters
