
import { Http } from '../common/http'
import { config } from './httpConfig'

let http = new Http(config)

let moduleName = '/api/books/'

export async function BookIndex (reqData, onSuccess, onError) {

  let bookimg = reqData.bookimg
  let bookName = reqData.bookName
  let bookAutor = reqData.bookAutor

  let params = { bookimg, bookName, bookAutor }
  let url = moduleName + 'books'
  const backWithReqData = JSON.stringify(params, null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
    console.log(err)
    console.log("看啊看是否失败")
  })
}