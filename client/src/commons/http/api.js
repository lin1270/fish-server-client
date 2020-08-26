/*包含n个请求函数的模块
* 函数的返回值：promise
* 第一个参数（url），第二个参数（post/get）--字符串*/
import http from './http'

/**
 * 基础请求
 * @param url 请求路径
 * @param params 请求参数
 * @param method 请求方式: POST(默认)、GET
 * */
export const sendRequest = (url, params, method) => {
    return new Promise((resolve, reject) => {
        //调用请求方法
        http({
            url: url,
            data: params || {},
            method: method || 'POST'
        }).then(res => {
            if (res.status === 200) {
                if (res.data.success) {
                    resolve(res.data)
                } else {
                    reject(JSON.stringify(res.data))
                }
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
} //post
