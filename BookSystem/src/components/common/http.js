import axios from 'axios';

axios.defaults.timeout = 6000
//请求超时时间

// var Promise = require('core-js/es6/promise')
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// //请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断

//     const token = store.state.token
//     token && (config.headers.Autorization = token)
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   })

// // 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   // 服务器状态码不是200的情况
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401：未登录
//         // 未登录则跳转登录界面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页面进行操作
//         case 401:
//           router.replace({
//             path: '/login',
//             query: { redirect: router.currentRouter.fullPath }
//           });
//           break;
//         case 403:
//           this.$notify({
//             type: 'success',
//             message: '登陆过期，请重新登陆',
//             duration: 1000
//           })
//           localStorage.removeItem('token')
//           store.commit('loginSuccess', null)
//           // 跳转登陆页面，并将要浏览的页面fullPath传过去
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRouter.fullPath
//               }
//             })
//           }, 1000);
//           break;
//         // 404请求不存在
//         case 404:
//           this.$notify({
//             type: 'success',
//             message: '网络请求不存在',
//             duration: 1500
//           })
//           break;
//         //其他错误，直接抛出错误提示
//         default:
//           this.$notify({
//             type: 'success',
//             message: error.response.data.message,
//             duration: 1500
//           })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

// export function get (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//       params: params
//     })
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }

// /**
//  * post方法，对应post请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
// export function post (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, QS.stringify(params))
//       .then(res => {
//         resolve(res.data)
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   })
// }

// class Http{

//   // const config = h
//   // const configs = _object.defaultsDeep(_object.defaultsDeep(config, baseConfig), customeConfig)
//   // this.instance = axios.create(configs)
// // 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断

//     const token = store.state.token
//     token && (config.headers.Autorization = token)
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   })

// // 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   },   
//   // 服务器状态码不是200的情况
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401：未登录
//         // 未登录则跳转登录界面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页面进行操作
//         case 401:
//           router.replace({
//             path: '/login',
//             query: { redirect: router.currentRouter.fullPath }
//           });
//           break;
//         case 403:
//           this.$notify({
//             type: 'success',
//             message: '登陆过期，请重新登陆',
//             duration: 1000
//           })
//           localStorage.removeItem('token')
//           store.commit('loginSuccess', null)
//           // 跳转登陆页面，并将要浏览的页面fullPath传过去
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRouter.fullPath
//               }
//             })
//           }, 1000);
//           break;
//         // 404请求不存在
//         case 404:
//           this.$notify({
//             type: 'success',
//             message: '网络请求不存在',
//             duration: 1500
//           })
//           break;
//         //其他错误，直接抛出错误提示
//         default:
//           this.$notify({
//             type: 'success',
//             message: error.response.data.message,
//             duration: 1500
//           })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )
// }

class Http {
  Get (url, data = {}) {
    return new Promise((resolve, reject) => {
      // this.instance({
      //   method: 'get',
      //   url: url,
      //   data: {},
      //   params: data
      // })
      axios(url, {
        // params:params
        params: data
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  Post (url, data = {}, upload = false) {
    return new Promise((resolve, reject) => {
      // this.instance.post(url, data, {
      //   transformRequesttransformRequest: [function (data, headers) {
      //     if (upload) {
      //       return data
      //     } else {
      //       let serializedData = JSON.stringify(data)
      //       return serializedData
      //     }
      //   }]
      // })
      axios.post(url, data, {
        transformRequest: [function (data, headers) {
          if (upload) {
            return data
          } else {
            let serializedData = JSON.stringify(data)
            return serializedData
          }
        }]
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
  Put (url, data = {}) {
    return new Promise((resolve, reject) => {
      // this.instance.put(url, data, {
      //   transformRequest: [function (data, headers) {
      //     let serializedData = JSON.stringify(data)
      //     return serializedData
      //   }]
      // })
      axios.put(url, {
        data: data
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  Delete (url, data = {}) {
    return new Promise((resolve, reject) => {
      // this.instance({
      //   method: 'delete',
      //   url: url,
      //   data: {},
      //   params: {}
      // })
      axios.Delete(url, {
        data: data
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}

export {
  Http
}