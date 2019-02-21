
import { Http } from '../../common/http'
import { config } from './httpConfig'

let http = new Http(config)

let moduleName = '/api/books/'

export async function borrow (reqData, onSuccess, onError) {
  let bookNum = reqData.bookNum //书编号
  let bookName = reqData.bookName // 书名
  let bookAutor = reqData.bookAutor // 作者
  let Borrower = reqData.Borrower //借阅人
  let borrowDate = reqData.borrowDate //借阅时间
  let returnDate = reqData.returnDate //借阅时间
  let classification = reqData.classification //借阅时间

  let params = { bookNum, bookName, bookAutor, Borrower, borrowDate, returnDate, classification }
  let url = moduleName + 'borrow'
  const backWithReqData = JSON.stringify(params, null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
    console.log("看啊看是否失败")
  })
}