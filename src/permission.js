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
  // if (sessionStorage.getItem('name')) {
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (getToken()) {
        const functionIds = getToken()
        store.dispatch('GenerateRoutes', { functionIds }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        next()
        // this.ax.get('user/getRoles').then(response => {
        //   if (response.data.code === 0) {
        //     // 请求成功
        //     this.tools.alertInfo(this, response.data.data)
        //     const roles = response.data.data.rolenames
        //     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
        //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //     })
        //     // this.$router.push({ path: '/' })
        //   } else {
        //     this.tools.alertError(this, response)
        //   }
        // }).catch((Error) => {
        //   this.tools.alertError(this, '请求错误！')
        //   next({ path: '/' })
        // })
        // // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // store.dispatch('GetInfo').then(res => { // 拉取用户信息
        // const roles = store.getters.roles // note: roles must be a array! such as: ['editor','develop']
        // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
        //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        // })
        // next() // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next('/login')
        NProgress.done()
        // // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(sessionStorage.getItem('roles'), to.meta.roles)) {
        //   next()//
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
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
