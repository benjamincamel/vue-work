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
    redirect: '/dashboard/dashboard'
  },
  { path: '/login', component: () => import('@/views/login'), name: '登录', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },

  // 表单
  {
    path: '/form',
    component: Layout,
    redirect: '/form/BaseForm',
    name: 'form',
    meta: {
      title: '系统管理',
      icon: 'fa fa-cog'
    },
    children: [
      {
        path: 'EditPassword',
        name: 'EditPassword',
        component: () => import('@/views/form/EditPassword'),
        meta: { title: '修改密码', icon: 'fa fa-key' }
      },
      {
        path: 'BaseForm',
        name: 'BaseForm',
        component: () => import('@/views/form/BaseForm'),
        meta: { title: '个人信息', icon: 'fa fa-info-circle' }
      }
    ]
  },

  // 入离职管理
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '入离职管理',
    meta: {
      title: '入离职管理',
      icon: 'fa fa-users'
    },
    children: [
      {
        path: 'complex-table',
        name: '入职员工管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '入职员工管理', icon: 'fa fa-user-plus' }
      },
      {
        path: 'complex-table1',
        name: '转正员工查询',
        component: () => import('@/views/table/complex-table1'),
        meta: { title: '转正员工查询', icon: 'fa fa-user' }
      },
      {
        path: 'complex-table2',
        name: '离职员工查询',
        component: () => import('@/views/table/complex-table2'),
        meta: { title: '离职员工查询', icon: 'fa fa-user-times' }
      }

    ]
  },
  // 招聘管理
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '招聘管理',
    meta: {
      title: '招聘管理',
      icon: 'fa fa-sitemap'
    },
    children: [
      {
        path: 'complex-table',
        name: '招聘需求',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '招聘需求', icon: 'fa fa-leaf' }
      },
      {
        path: 'complex-table1',
        name: '简历筛选',
        component: () => import('@/views/table/complex-table1'),
        meta: { title: '简历筛选', icon: 'fa fa-filter' }
      }
    ]
  },
  // 合同管理
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '合同管理',
    meta: {
      title: '合同管理',
      icon: 'fa fa-folder'
    },
    children: [
      {
        path: 'complex-table',
        name: '合同管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '合同管理', icon: 'fa fa-file' }
      }
    ]
  },
  // 职场管理
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '职场管理',
    meta: {
      title: '职场管理',
      icon: 'fa fa-address-book-o'
    },
    children: [
      {
        path: 'complex-table',
        name: '全通考勤',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '全通考勤', icon: 'fa fa-id-badge' }
      },
      {
        path: 'complex-table',
        name: '北京物联网考勤',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '北京物联网考勤', icon: 'fa fa-id-badge' }
      },
      {
        path: 'complex-table',
        name: '成都物联网考勤',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '成都物联网考勤', icon: 'fa fa-id-badge' }
      },
      {
        path: 'complex-table',
        name: '百度考勤',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '百度考勤', icon: 'fa fa-id-badge' }
      },
      {
        path: 'complex-table',
        name: '考勤管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '考勤管理', icon: 'fa fa-id-badge' }
      }
    ]
  },
  // 薪酬管理
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '薪酬管理',
    meta: {
      title: '薪酬管理',
      icon: 'fa fa-rmb'
    },
    children: [
      {
        path: 'complex-table',
        name: '工资管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '工资管理', icon: 'fa fa-credit-card' }
      },
      {
        path: 'complex-table',
        name: '奖惩管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '奖惩管理', icon: 'fa fa-meh-o' }
      },
      {
        path: 'complex-table',
        name: '查询管理',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '查询管理', icon: 'fa fa-search' }
      }
    ]
  },
  // 项目经管
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: '项目经管',
    meta: {
      title: '项目经管',
      icon: 'fa fa-tasks'
    },
    children: [
      {
        path: 'complex-table',
        name: '利润测算表',
        component: () => import('@/views/table/complex-table'),
        meta: { title: '利润测算表', icon: 'fa fa-calculator' }
      }
    ]
  }
]

export default new Router({
  // 后端支持可开
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 报表
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '首页', icon: 'fa fa-dashboard', roles: ['普通管理员', '人事专员'] },
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '首页', icon: 'fa fa-home', roles: ['普通管理员', '人事专员'] }
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
