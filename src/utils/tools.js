export default {
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
