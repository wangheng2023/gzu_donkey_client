const changeTime = {
  // 时间对象
  change(val) {
    const dateold = new Date(val)
    const date = new Date().getTime()
    const str = new Date(date)
    // console.log(str)
    if (str.getMonth() === dateold.getMonth() && str.getDate() === dateold.getDate()) {
      const h = dateold.getHours() + ':'
      const m = dateold.getMinutes()
      return h + m
    } else if (str.getMonth() === dateold.getMonth() && str.getDate() - dateold.getDate() === 1) {
      return '昨天'
    } else {
      const M = dateold.getMonth() + 1
      const D = dateold.getDate()
      return M + '.' + D
    }
  }
}
export default changeTime
