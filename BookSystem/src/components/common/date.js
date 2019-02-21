//时间戳转换
// export const fmtDate = (obj) => {
//   var date = new Date(obj);
//   var y = 1900 + date.getYeay();
//   var m = "0" + (date.getMonth() + 1);
//   var d = "0" + date.getDate();
//   return y + "-" + m.substring(m - length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
// }

// export const stampToDate = (targetStamp) => {
//   if (!targetStamp) { return '' }
//   var longTarget = getLongStamp(targetStamp)
//   var y = new Date(longTarget).getFullYear()
//   var m = new Date(longTarget).getMonth() + 1
//   var d = new Date(longTarget).getDate()
//   return y + '-' + fix(m, 2) + '-' + fix(d, 2)
// }
export const getLongStamp = (tmp) => {
  if (tmp.toString().length < 13) {
    return parseInt(tmp, 10) * 1000
  }
  return tmp
}
export const fix = (num, length) => {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num
}

export const stampToDate = (targetStamp) => {
  if (!targetStamp) { return '' }
  var longTarget = getLongStamp(targetStamp)
  var y = new Date(longTarget).getFullYear()
  var m = new Date(longTarget).getMonth() + 1
  var d = new Date(longTarget).getDate()
  return y + '-' + fix(m, 2) + '-' + fix(d, 2)
}