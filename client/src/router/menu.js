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
    {
        title: '书籍管理',
        icon: 'ios-contact',
        path: '/book',
        children: [
            {
                title: '书籍列表',
                path: '/book/list',
                action: 'book-list-page'
            },
        ]
    },
]

export default menu
