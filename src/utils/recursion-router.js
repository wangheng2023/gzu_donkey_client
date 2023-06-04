// 对比路由权限
// import DynamicRouters from '@/router/DynamicRouters'
// const DynamicRouters = [
//   { path: '/managerorder', name: 'managerorder', meta: { name: '订单管理' } },
//   { path: '/managesave', name: 'managesave', meta: { name: '救助金管理' } },
//   { path: '/manageuser', name: 'manageuser', meta: { name: '用户管理' } },
//   { path: '/managegood', name: 'managegood', meta: { name: '商品管理' } },
//   { path: '/managerole', name: 'managerole', meta: { name: '角色管理' } },
//   { path: '/managefunc', name: 'managefunc', meta: { name: '功能管理' } },
//   { path: '/manageinsider', name: 'manageinsider', meta: { name: '内部人员管理' } },
//   { path: '/managedistribute', name: 'managedistribute', meta: { name: '功能分配' } }
// ]
export function recursionRouter(userRouter = [], allRouter = []) {
  const realRouter = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.name === v.meta.name) {
        realRouter.push(v)
      }
    })
  })
  return realRouter
}
// const val = recursionRouter(['订单管理', '救助金管理', '用户管理'], DynamicRouters)
// console.log(val)
