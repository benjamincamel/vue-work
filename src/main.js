import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '../static/css/iconfont/1.0.0/index.css' /* icofont*/

// css
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css

// import './mock' // simulation data

// font-awesome
import '@/assets/library/font-awesome-4.7.0/css/font-awesome.min.css'

import App from './App'

import router from './router'

import store from './store'

import axios from 'axios' // axios请求插件
import qs from 'qs' // axios请求参数格式装换插件

// Internationalization
import i18n from './lang'

import {
  loadStyle
} from './utils/util'

import tools from './utils/tools' // tools工具js
// import { removeToken } from '@/utils/auth' // 验权
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'

import '@/icons' // icon

import '@/permission' // permission control

import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { locale })
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.prototype.tools = tools // 注册工具
const env = false // 正式环境、测试环境切换 false-测试环境  true-测试环境
// 数据请求设置
// config里面的transformRquest方法会在发送参数前对参数进行处理。
// 通过Qs.stringify转换为表单查询参数
const ax = axios.create({
  transformRequest: [function(data) {
    // data.authority = sessionStorage.common_jf_authority
    data = qs.stringify(data)
    return data
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 30000, // 超时时间 10s
  baseURL: env ? '正式环境' : 'api'
})
Vue.prototype.ax = ax // 注册axios_instance到Vue实例原型中 名为ax

// // 全局路由钩子
// router.beforeEach((to, from, next) => {
//   // 检测地址栏中是否带有 authority 字段参数
//   // if (location.href.indexOf('authority') === -1 && !sessionStorage.common_jf_authority) { // 表明地址栏没有参数  session中也没存参数
//   //   // 没有登录信息时 跳转到IPP&SP登录页面
//   //   location.href = env ? 'ippsp正式环境': 'http://localhost:8080/login'
//   // } else {
//   //   // 有登陆信息的 截取带过来的用户信息 储存在session中  存过就不再存了
//   //   !sessionStorage.common_jf_authority && (sessionStorage.common_jf_authority = location.href.split('?')[1].split('=')[1])
//   // }
//   next()
// })

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})

// 页面加载时只执行onload
// 页面关闭时只执行onunload
// 页面刷新时先执行onbeforeunload，然后onunload，最后onload。
window.onload = function() { // 页面读取后  将localStorage中的数据替换到store.state中
  // localStorage.common_jf_store && store.replaceState(JSON.parse(localStorage.common_jf_store))
}
window.onbeforeunload = function() { // 页面刷新前
}
window.onunload = function() { // 页面关闭前  将store.state保存在localStorage中
  // localStorage.common_jf_store = JSON.stringify(store.state)
  // removeToken()
  // sessionStorage.clear()
  localStorage.clear() // 关闭或刷新浏览器 清除localStorage存储
}
