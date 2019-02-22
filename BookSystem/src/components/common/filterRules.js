
import { isCardId, isPositiveNb } from './regRules'

const Validate = function (Vue, options) {


  // 身份证
  const isIdentityCard = (rule, value, callback) => {
    if (value !== null && value !== '') {
      if (!isCardId(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    } else {
      callback(new Error('请输入!'))
    }
  }

  // 正数
  const isPositive = (rule, value, callback) => {
    if (value !== null && value !== '') {
      if (!isPositiveNb(value)) {
        callback(new Error('只能年龄大于6岁才行哦'))
      } else {
        callback()
      }
    } else {
      callback(new Error('请输入!'))
    }
  }


  Vue.prototype.filter_rules = function (item) {
    let rules = []
    let eventName = item.event || 'blur'
    if (item.condition && item.condition.need && !item.condition.req) {
      const valid = (rule, value, callback) => {
        callback()
      }
      rules.push({ validator: valid, trigger: eventName })
      return rules
    }
    if (item.required) {
      rules.push({ required: true, message: item.msg || '该输入项为必填项!', trigger: eventName })
    }
    if (item.type) {
      let type = item.type
      switch (type) {
        case 'IdentityCard':
          rules.push({ validator: isIdentityCard, trigger: eventName })
          break
        case 'numberPositive':
          rules.push({ validator: isPositive, trigger: eventName })
          break
      }
    }


    return rules
  }
}

export default Validate