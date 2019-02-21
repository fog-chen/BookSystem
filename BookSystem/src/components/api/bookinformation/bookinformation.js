
import { Http } from '../../common/http'
import { config } from './httpConfig'

let http = new Http(config)

let moduleName = '/api/books/'

export async function Bookinformation (reqData, onSuccess, onError) {
  let bookNum = reqData.bookNum //书编号
  let bookName = reqData.bookName // 书名
  let bookAutor = reqData.bookAutor // 作者
  let data = reqData.data //入库时间
  let bookNumber = reqData.bookNumber //数量
  let borrow = reqData.borrow //借阅数量
  let noBorrow = reqData.noBorrow //未归还数量
  let classification = reqData.classification //图书分类

  let params = { bookNum, bookName, bookAutor, data, bookNumber, borrow, noBorrow, classification }
  let url = moduleName + 'bookinformation'
  const backWithReqData = JSON.stringify(params, null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
    console.log("看啊看是否失败")
  })
}