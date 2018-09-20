import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import {
  setTitle
} from '@/utils/util' // 设置浏览器头部标题

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('超级管理员') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
  // 如果是登录页面路径，就直接next()
    console.log('111111111111')
    next()
    NProgress.done()
  }
  if (getToken()) {
    /* has token*/
    console.log('222222222222222')
    console.log(store.getters.permission_routers)
    if (!store.getters.permission_routers) {
      const functionIds = getToken()
      store.dispatch('GenerateRoutes', { functionIds }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to }) // 放行路由// next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
      // next()
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('3333333333333')
      next()
    } else {
      console.log('444444444444')
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})
