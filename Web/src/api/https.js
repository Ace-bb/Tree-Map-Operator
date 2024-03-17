import QS from 'qs'
import service from './request'
// 环境的切换
//  if (process.env.NODE_ENV === 'development') {
//     service.defaults.baseURL = 'http://172.20.137.133:8000/'
//  } else if (process.env.NODE_ENV === 'debug') {
//     service.defaults.baseURL = 'http://172.20.137.133:8000/'
//  } else if (process.env.NODE_ENV === 'production') {
//     service.defaults.baseURL = 'http://172.20.137.133:8000/'
//  }
// service.defaults.baseURL = 'http://172.20.137.133:13511/'
service.defaults.baseURL = 'http://172.20.137.133:13533/'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, para) {
    console.log("get:", para)
    return new Promise((resolve, reject) => {
    service.get(url, {
            params: para
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
    service.post(url, params)
        .then(res => {
            console.log("post: ",res)
            resolve(res.data.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

/**
 * put 方法 对应update请求
 * @param {string} url [请求的地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        service.put(url, params)
        .then(res => {
            resolve(res.data.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

/**
 * delete 方法 对应delete请求
 * @param {string} url [请求的地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params) {
    return new Promise((resolve, reject) => {
        console.log('del')
        service.delete(url, { params: params })
        .then(res => {
            resolve(res.data.data)
        })
        .catch(err => {
            console.log(err)
            reject(err.data)
        })
    })
}

/**
 * patch 方法 对应partial_update请求
 * @param {string} url [请求的地址]
 * @param {Object} params [请求时携带的参数]
 */
export function patch(url, params) {
    return new Promise((resolve, reject) => {
        service.patch(url, QS.stringify(params))
        .then(res => {
            resolve(res.data.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}
