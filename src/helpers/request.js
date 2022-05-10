import axios from 'axios'
import baseURLConfig from './config-baseURL'
import {Message} from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
//服务端设置好 cors 后，可以跨域，可以请求到数据，但是再次发送请求时无法带上 cookie ，要进行以下设置，当 axios 发请求时会带上 cookie ：
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >=200 && status < 300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      }else {
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err=>{
      Message.error(err)
      reject({msg: '网络异常'})
    })
  })
}
