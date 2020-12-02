const service = require('./service')
const token = require('../../../utils/token')
const errorInfo = require('../../../common/errcode')
const dbUtils = require('../../../utils/dbUtils')
const fish = require('../../../db/fish')
const errstr = require('../../../../config/errstr')

module.exports = {
    '/api/book/query': (req, res, next)=>{
        service.query(req.body, (errcode, err, result)=> {
            return res.json({retcode: errcode, msg: errcode.msg, data: {rows: result}})
        })
    }, 

    '/api/book/add': (req, res, next)=>{
        service.add(req.body, (errcode, error, result)=> {
            return res.json({retcode: errcode, msg: errcode === errorInfo.SUCCESS ? errstr.addSuccess : errstr.addFail})
        })
    },

    '/api/book/update': (req, res, next)=>{
        if (req.body.id) {
            service.update(req.body, (errcode, error, result)=>{
                return res.json({retcode: errcode, msg: errorInfo.errStr[errcode] || errstr.unknownError})
            })
        } else {
            return res.json({retcode: errorInfo.FAIL, msg: errorInfo.errStr[errorInfo.FAIL] || errstr.unknownError})
        }
    },

    '/api/book/delete': (req, res, next)=>{
        service.delete(req.body, (errcode, error, result)=> {
            return res.json({retcode: errcode, msg: errorInfo.errStr[errcode] || errstr.unknownError})
        })
    },
}