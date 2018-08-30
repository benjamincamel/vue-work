export default {
  // 储存页面相对的localStorage数据
  setLocal(pathName, localName, value) { // pathName路径名 localName--local存的名字  value是存的值
    let pn = pathName.replace(/-(\w)/g, ($0, $1) => {
      return $1.toUpperCase()
    })
    localStorage[`common_jf_${pn}_${localName}`] = JSON.stringify(value)
  },
  // 读取页面相对的localStorage数据 命名--localStorage.common_jf_路由名_变量名
  getLocal(pathName, localName) { // localName是变量名
    let pn = pathName.replace(/-(\w)/g, ($0, $1) => {
      return $1.toUpperCase()
    })
    if (localStorage[`common_jf_${pn}_${localName}`]) {
      return JSON.parse(localStorage[`common_jf_${pn}_${localName}`])
    } else {
      return false
    }
  },
  // 删除local数据
  removeLocal(pathName, localName) {
    let pn = pathName.replace(/-(\w)/g, ($0, $1) => {
      return $1.toUpperCase()
    })
    localStorage.removeItem(`common_jf_${pn}_${localName}`)
  },
  // 将日期对象转化为 2018-08-08 的日期格式
  dateFormat(dateObj) { // dateObj 日期对象 比如new Date()
    if (!dateObj) {
      return ''
    }
    return dateObj.getFullYear() + '-' + ((dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)) + '-' + (dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()) + ' ' + (dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()) + ':' + (dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()) + ':' + (dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds())
  },
  // 将日期对象转化为 2018-08-08 的日期格式
  dateFormat(dateObj) { // dateObj 日期对象 比如new Date()
    if (!dateObj) {
      return ''
    }
    return dateObj.getFullYear() + '-' + ((dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)) + '-' + (dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()) + ' ' + (dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()) + ':' + (dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()) + ':' + (dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getSeconds())
  },
  monthFormat(monthObj) { // monthObj 月份对象 比如new month()
    if (!monthObj) {
      return ''
    }
    return monthObj.getFullYear() + '-' + ((monthObj.getMonth() + 1) < 10 ? '0' + (monthObj.getMonth() + 1) : (monthObj.getMonth() + 1))
  },
  alertError(that, response) { // response可以是接口返回的对象  也可以是字符串
    that.$message({
      showClose: true,
      message: response.data ? response.data.msg : response,
      type: 'error',
      center: true,
      duration: 5000
    })
  },
  alertInfo(that, msg) { // response可以是接口返回的对象  也可以是字符串
    that.$message({
      showClose: true,
      message: msg,
      type: 'success',
      center: true,
      duration: 5000
    })
  }
}
