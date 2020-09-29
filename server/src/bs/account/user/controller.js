const userService = require('./service')
const token = require('../../../utils/token')
const errorInfo = require('../../../common/errcode')
const dbUtils = require('../../../utils/dbUtils')
const fish = require('../../../db/fish')

module.exports = {
    '/api/user/query': (req, res, next)=>{
        userService.query(req.body, (errcode, err, result)=> {
            return res.json({retcode: errcode.code, msg: errcode.msg, data: {rows: result}})
        })
    }, 
    
    '/api/user/login': (req, res, next)=>{
        userService.login(req.body, (errcode, error, result)=> {
            if (errcode.code !== errorInfo.SUCCESS.code) {
                return res.json({retcode: errcode.code, msg: '账号或密码不正确!'})
            }
            const rowInfo = result[0];
            token.setHeaderToken(req, res, rowInfo)
            return res.json({retcode: errcode.code, info: rowInfo, msg: '登录成功'})
        })
    },

    '/api/user/register': (req, res, next)=>{
        dbUtils.isItemExist(fish, 'user', 'account', req.body.account, (existed, err, result)=>{
            if (existed) {
                return res.json({retcode: errorInfo.FAIL.code, msg: '用户已存在'})
            }

            if (err) {
                return res.json({retcode: errorInfo.SQL_ERROR.code, msg: errorInfo.SQL_ERROR.msg})
            }

            userService.register(req.body, (errcode, error, result)=> {
                return res.json({retcode: errcode.code, msg: errcode.code === errorInfo.SUCCESS.code ? '注册成功' : '注册失败'})
            })
        })
    },

    '/api/user/save': (req, res, next)=>{
        if (req.body.id) {
            userService.update(req.body, (errcode, error, result)=>{
                return res.json({retcode: errcode.code, msg: errcode.msg})
            })
        } else {
            return res.json({retcode: errorInfo.FAIL.code, msg: errorInfo.FAIL.msg})
        }
        // else {
        //     this['/api/user/register'](req, res, next);
        // }
    },

    '/api/user/delete': (req, res, next)=>{
        userService.delete(req.body, (errcode, error, result)=> {
            return res.json({retcode: errcode.code, msg: errcode.msg})
        })
    },
}