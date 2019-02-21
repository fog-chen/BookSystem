
import { getBaseURL } from '../../common/commLogic'

// 生产环境域名
const baseURL = getBaseURL('BOOK_API').api || 'https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/'
// const baseURL = 'https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/'

const config = {
  baseURL

}

export { config }