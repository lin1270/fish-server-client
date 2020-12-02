import axios from 'axios'
import { Message } from 'view-design'
import store from '../../store/index'
import router from '../../router/router'
import { baseURL, timeout} from './config'

//所有请求的携带的参数设置
const http = axios.create({
    baseURL,
    timeout
})

//设置拦截器
http.interceptors.request.use(function (config) {
    //过滤字段
    for (let item in config.data) {
    //过滤清除空格(如果是字符串就过滤)
        if (typeof config.data[item] === 'string') config.data[item].replace(/ /g, '')
        //过滤清除为空的属性
        if (config.data[item] === '') delete config.data[`${item}`]
    }
    //发送请求先要做的事情
    config.headers = {
        'content-type': 'application/json',
        'x-user-token': store.getters.getToken
    }
    //表格loading状态
    store.state.loading = true
    return config
}, function (error) {
    return Promise.reject(error)
})


http.interceptors.response.use(res => {
    //取消表格loading状态
    store.state.loading = false
    if (res.data.retcode !== 0) {
        if (res.request.responseType !== 'blob') {
            Message.error({
                content: res.data.msg,
                duration: 3
            })
        }
        if (res.data.retcode === 401) {
            setTimeout(() => { router.replace('/login') }, 500)

        }
    }
    //对响应数据成功回调时的处理
    if (res.data.retcode === 0 && res.headers['x-user-token']) {
        store.state.token = res.headers['x-user-token']
    }
    return res
}, (err) => {
    //对响应数据error处理
    store.state.loading = false
    Message.error({
        content: '网络请求超时，请重新请求网络!',
        duration: 3
    })
    return Promise.reject(err)
})


export default http
