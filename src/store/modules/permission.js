import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // return roles.some(hasFunction(route.meta.roles))
    return roles.some(role => route.meta.roles.indexOf(',' + role + ',') >= 0)
    // return route.meta.roles.some(role => roles.indexOf(role) >= 0)
    // return roles.indexOf(route.meta.roles) >= 0
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log('state.routers', state.routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        console.log(typeof data)
        console.log(data.functionIds)
        var roles = JSON.parse(data.functionIds)
        console.log(typeof roles)
        // const roles = Object.values(data)
        console.log(roles)
        let accessedRouters
        // if (roles.indexOf('超级管理员') >= 0)
        if (hasPermission(roles, '超级管理员')) {
          console.log('超级管理员>=0')
          accessedRouters = asyncRouterMap
        } else {
          console.log('超级管理员<0')
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          // accessedRouters = ''
          // accessedRouters = asyncRouterMap
        }
        console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
