const menu = [
    {
        title: '首页',
        icon: 'ios-home',
        path: '/index',
        admin: true,
        action: 'user-self'
    },
    {
        title: '用户管理',
        icon: 'ios-contact',
        path: '/user',
        children: [
            {
                title: '用户列表',
                path: '/user/list',
                action: 'user-list-page'
            },
        ]
    },
]

export default menu
