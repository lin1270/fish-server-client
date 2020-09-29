const userService = require('./service')
const token = require('../../../utils/token')

module.exports = {
    '/api/user/query': (req, res, next)=>{
        userService.query(req.body, (error, result)=> {
            if (error) return next()
            return res.json({success: true, data: {rows: result}})
        })
    }, 
    
    '/api/user/login': (req, res, next)=>{
        userService.login(req.body, (error, result)=> {
            if (error || !result || !result.length) {
                return res.json({success: false, msg: '账号或密码不正确!'})
            }
            token.setHeaderToken(req, res, result[0])
            return res.json({success: true, info: result[0], msg: '登录成功'})
        })
    },

    '/api/user/register': (req, res, next)=>{
        userService.register(req.body, (error, result)=> {
            if (error) {
                return res.json({success: false, msg: error})
            }
            return res.json({success: true, msg: '注册成功'})
        })
    },

    '/api/user/save': (req, res, next)=>{
        if (req.body.id) {
            userService.update(req.body, (error, result)=>{
                if (error) {
                    return res.json({success: false, msg: error})
                }

                if (result.affectedRows == 0) {
                    return res.json({success: false, msg: '保存失败'})
                }
                return res.json({success: true, msg: '保存成功'})
            })
        } else {
            userService.register(req.body, (error, result)=> {
                if (error) {
                    return res.json({success: false, msg: error})
                }
                return res.json({success: true, msg: '保存成功'})
            })
        }
    },

    '/api/user/delete': (req, res, next)=>{
        userService.delete(req.body, (error, result)=> {
            if (error) {
                return res.json({success: false, msg: error})
            }
            return res.json({success: true, msg: '删除成功'})
        })
    },
}