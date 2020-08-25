const userService = require('./service')
const token = require('../../../utils/token')

module.exports = {
    '/api/user/query': (req, res, next)=>{
        userService.query(req.query, (error, result)=> {
            if (error) return next()
            return res.json(result)
        })
    }, 
    
    '/api/user/login': (req, res, next)=>{
        userService.login(req.query, (error, result)=> {
            if (error || !result || !result.length) {
                return res.json({success: false, errMsg: '账号或密码不正确!'})
            }
            token.setHeaderToken(req, res, result[0])
            return res.json({success: true, info: result[0], errMsg: '登录成功'})
        })
    },

    '/api/user/register': (req, res, next)=>{
        userService.register(req.query, (error, result)=> {
            if (error) {
                return res.json({success: false, errMsg: error})
            }
            return res.json({success: true, errMsg: '注册成功'})
        })
    },
}