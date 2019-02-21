import { URLdata } from './baseURL'
/**
 * 获取环境变量中的域名信息
 * @param {String} modelName 环境变量模块名
 */
export function getBaseURL (modelName) {
  return URLdata[modelName] ? URLdata[modelName] : ''
}