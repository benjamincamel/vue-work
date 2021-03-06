import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   name: 'login',
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: '/form/myInfo'
  },
  { path: '/login', component: () => import('@/views/login'), name: '登录', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true }

]

export default new Router({
  // 后端支持可开
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 系统管理
  {
    path: '/form',
    component: Layout,
    redirect: '/form/myInfo',
    name: 'form',
    meta: {
      title: '系统管理',
      icon: 'fa fa-cog',
      roles: ',1,'
    },
    children: [
      {
        path: 'editPassword',
        name: 'EditPassword',
        component: () => import('@/views/form/editPassword'),
        meta: { title: '修改密码', icon: 'fa fa-key', roles: ',8,' }
      },
      {
        path: 'myInfo',
        name: 'myInfo',
        component: () => import('@/views/form/myInfo'),
        meta: { title: '个人信息', icon: 'fa fa-info-circle', roles: ',11,' }
      }
    ]
  },
  // 招聘管理
  {
    path: '/hire',
    component: Layout,
    redirect: '/hire/demand',
    name: '招聘管理',
    meta: {
      title: '招聘管理',
      icon: 'fa fa-sitemap',
      roles: ',2,'
    },
    children: [
      {
        path: 'demand',
        name: '招聘需求',
        component: () => import('@/views/hire/demand'),
        meta: { title: '招聘需求', icon: 'fa fa-leaf', roles: ',9,' }
      },
      {
        path: 'resume',
        name: '邀约面试',
        component: () => import('@/views/hire/resume'),
        meta: { title: '邀约面试', icon: 'fa fa-filter', roles: ',10,' }
      },
      {
        path: 'interview',
        name: '面试沟通',
        component: () => import('@/views/hire/interview'),
        meta: { title: '面试沟通', icon: 'fa fa-handshake-o', roles: ',10,' }
      }
    ]
  },
  // 入离职管理
  {
    path: '/person',
    component: Layout,
    redirect: '/person/entry-manage',
    name: '入离职管理',
    meta: {
      title: '入离职管理',
      icon: 'fa fa-users',
      roles: ',3,'
    },
    children: [
      {
        path: 'entry-manage',
        name: '入职员工管理',
        component: () => import('@/views/person/entry-manage'),
        meta: { title: '入职员工管理', icon: 'fa fa-user-plus', roles: ',12,' }
      },
      {
        path: 'turn-manage',
        name: '转正员工查询',
        component: () => import('@/views/person/turn-manage'),
        meta: { title: '转正员工查询', icon: 'fa fa-user', roles: ',24,' }
      },
      {
        path: 'leave-manage',
        name: '离职员工查询',
        component: () => import('@/views/person/leave-manage'),
        meta: { title: '离职员工查询', icon: 'fa fa-user-times', roles: ',25,' }
      },
      {
        path: 'add-edit-info',
        name: 'addEdit',
        component: () => import('@/views/person/add-edit-info'),
        meta: { title: '新增/修改员工信息', icon: 'fa fa-user-circle-o', roles: ',25,' }
      }
    ]
  },
  // 合同管理
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/contract-manage',
    name: '合同管理',
    meta: {
      title: '合同管理',
      icon: 'fa fa-folder',
      roles: ',13,'
    },
    children: [
      {
        path: 'contract-manage',
        name: '合同管理',
        component: () => import('@/views/contract/contract-manage'),
        meta: { title: '合同管理', icon: 'fa fa-file-o', roles: ',23,' }
      }
    ]
  },
  // 职场管理
  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/complex-table',
    name: '职场管理',
    meta: {
      title: '职场管理',
      icon: 'fa fa-address-book-o',
      roles: ',4,'
    },
    children: [
      {
        path: 'attendance-common',
        name: '全通物联网考勤',
        component: () => import('@/views/attendance/attendance-common'),
        meta: { title: '全通物联网考勤', icon: 'fa fa-calendar-check-o', roles: ',14,' }
      },
      {
        path: 'attendance-manage',
        name: '年假休假加班管理',
        component: () => import('@/views/attendance/attendance-manage'),
        meta: { title: '年假休假加班管理', icon: 'fa fa-calendar', roles: ',18,' }
      },
      {
        path: 'attendance-baidu',
        name: '百度考勤',
        component: () => import('@/views/attendance/attendance-baidu'),
        meta: { title: '百度考勤', icon: 'fa fa-calendar-plus-o', roles: ',17,' }
      },
      {
        path: 'attendance-holiday',
        name: '节假日管理',
        component: () => import('@/views/attendance/attendance-holiday'),
        meta: { title: '节假日管理', icon: 'fa fa-calendar-o', roles: ',17,' }
      }
    ]
  },
  // 薪酬管理
  {
    path: '/salary',
    component: Layout,
    redirect: '/salary/salary-manage',
    name: '薪酬管理',
    meta: {
      title: '薪酬管理',
      icon: 'fa fa-rmb',
      roles: ',5,'
    },
    children: [
      {
        path: 'salary-manage',
        name: '工资管理',
        component: () => import('@/views/salary/salary-manage'),
        meta: { title: '工资管理', icon: 'fa fa-credit-card', roles: ',19,' }
      },
      {
        path: 'reward-punish',
        name: '奖惩管理',
        component: () => import('@/views/salary/reward-punish'),
        meta: { title: '奖惩管理', icon: 'fa fa-meh-o', roles: ',20,' }
      },
      {
        path: 'insurance-manage',
        name: '社保管理',
        component: () => import('@/views/salary/insurance-manage'),
        meta: { title: '社保管理', icon: 'fa fa-laptop', roles: ',21,' }
      }
    ]
  },
  // 项目经管
  {
    path: '/project',
    component: Layout,
    redirect: '/project/profit-calculation',
    name: '项目经管',
    meta: {
      title: '项目经管',
      icon: 'fa fa-tasks',
      roles: ',6,'
    },
    children: [
      {
        path: 'profit-calculation',
        name: '利润测算表',
        component: () => import('@/views/project/profit-calculation'),
        meta: { title: '利润测算表', icon: 'fa fa-calculator', roles: ',22,' }
      }
    ]
  }
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //     { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]
