
import { Http } from '../../common/http'
import { config } from './httpConfig'

let http = new Http(config)

let moduleName = '/api/books/'

export async function userInformation (reqData, onSuccess, onError) {
  let userName = reqData.userName //用户（借阅人）
  let borrowNum = reqData.borrowNum // 借阅本数
  let returned = reqData.returned // 归还数量
  let noReturn = reqData.noReturn //未归还数量
  let sex = reqData.sex //性别
  let age = reqData.age //年龄
  let deposit = reqData.deposit //眼
  let ID = reqData.ID //身份证
  let reputationNum = reqData.reputationNum //信誉分

  let params = { userName, borrowNum, returned, noReturn, sex, age, deposit, ID, reputationNum }
  let url = moduleName + 'userInformation'
  const backWithReqData = JSON.stringify(params, null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
    console.log("看啊看是否失败")
  })
}