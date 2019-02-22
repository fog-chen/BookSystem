// 正则验证


// 为正数
export const isPositiveNb = (val) => {
  return val > 5 && val < 100
}

// 非零正整数
export const noZeroPositiveInteger = (val) => {
  var reg = /^[1-9]\d*$/
  return reg.test(val)
}

// 验证身份证号码
export const isCardId = (val) => {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(val)
}