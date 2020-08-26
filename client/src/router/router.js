import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* global require */
export default new Router({
    //mode: 'history',
    routes: [
        {
            path: '/main',
            component: (resolve) => require(['@/views/Main'], resolve),
            name: '',
            children: [
                {
                    path: '/index',
                    component: (resolve) => require(['@/views/index'], resolve),
                    name: '首页'
                },

                // 用户列表
                {
                    path: '/user/list',
                    component: (resolve) => require(['@/views/user/list'], resolve),
                    name: '用户列表'
                },
            ]
        },
        {
            path: '/',
            component: (resolve) => require(['@/views/login/Login'], resolve),
            name: '登录'
        },
        {
            path: '/login',
            redirect: '/',
            component: (resolve) => require(['@/views/login/Login'], resolve),
            name: '登录'
        },
        {
            path: '*',
            component: (resolve) => require(['@/views/404'], resolve),
            name: '404'
        }
    ]
})



