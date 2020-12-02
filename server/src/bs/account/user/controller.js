const userService = require('./service')
const token = require('../../../utils/token')
const errorInfo = require('../../../common/errcode')
const dbUtils = require('../../../utils/dbUtils')
const fish = require('../../../db/fish')

module.exports = {
    '/api/user/query': (req, res, next)=>{
        console.log('...', req)
        userService.query(req.body, (errcode, err, result)=> {
            return res.json({retcode: errcode, msg: errcode.msg, data: {rows: result[0], total:result[1][0].total}})
        })
    }, 
    
    '/api/user/login': (req, res, next)=>{
        userService.login(req.body, (errcode, error, result)=> {
            if (errcode !== errorInfo.SUCCESS) {
                return res.json({retcode: errcode, msg: '账号或密码不正确!'})
            }
            const rowInfo = result[0];
            token.setHeaderToken(req, res, rowInfo)
            return res.json({retcode: errcode, info: rowInfo, msg: '登录成功'})
        })
    },

    '/api/user/register': (req, res, next)=>{
        dbUtils.isItemExist(fish, 'user', 'account', req.body.account, (existed, err, result)=>{
            if (existed) {
                return res.json({retcode: errorInfo.FAIL, msg: '用户已存在'})
            }

            if (err) {
                return res.json({retcode: errorInfo.SQL_ERROR, msg: errorInfo.errStr[errorInfo.SQL_ERROR]})
            }

            userService.register(req.body, (errcode, error, result)=> {
                return res.json({retcode: errcode, msg: errcode === errorInfo.SUCCESS ? '注册成功' : '注册失败'})
            })
        })
    },

    '/api/user/save': (req, res, next)=>{
        if (req.body.id) {
            userService.update(req.body, (errcode, error, result)=>{
                return res.json({retcode: errcode, msg: errorInfo.errStr[errcode] || '成功'})
            })
        } else {
            return res.json({retcode: errorInfo.FAIL, msg: errorInfo.errStr[errorInfo.FAIL] || '错误'})
        }
        // else {
        //     this['/api/user/register'](req, res, next);
        // }
    },

    '/api/user/delete': (req, res, next)=>{
        userService.delete(req.body, (errcode, error, result)=> {
            return res.json({retcode: errcode, msg: errorInfo.errStr[errcode] || ''})
        })
    },
}