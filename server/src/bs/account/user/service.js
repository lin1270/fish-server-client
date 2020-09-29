const dbFish = require('../../../db/fish')
const dbUtils = require('../../../utils/dbUtils')
const uuid = require('../../../utils/uuid')
const mysql = require('mysql')
const errcode = require('../../../common/errcode')
const errorInfo = require('../../../common/errcode')

module.exports = {
    query(param, cb) {
        const sql = dbUtils.makeSelectByParam('user', 'id,account,name', param)
        dbFish.exeSql(sql, (error, result)=>{
            return cb(error ? errcode.SQL_ERROR : errcode.SUCCESS, error, result)
        })
    },

    login(param, cb) {
        dbFish.exeSql(`SELECT id,account,name FROM user WHERE account=${mysql.escape(param.account)} AND pwd=${mysql.escape(param.pwd)}`, (err, result)=>{
            let errRet = errorInfo.SUCCESS
            if (err) errRet = errorInfo.SQL_ERROR
            else if (err || !result || !result.length) {
                errRet = errorInfo.FAIL
            }
            cb(errRet, err, result)
        })
    },

    register(param, cb) {
        dbFish.exeSql(`INSERT INTO user(id, account, pwd, name) VALUES(${mysql.escape(uuid())}, ${mysql.escape(param.account)}, ${mysql.escape(param.pwd)}, ${mysql.escape(param.name)})`, (err, result)=>{
            cb(err ? errcode.SQL_ERROR : errcode.SUCCESS, err, result)
        })
    },

    update(param, cb) {
        dbFish.exeSql(`UPDATE user SET pwd=${mysql.escape(param.pwd)}, name=${mysql.escape(param.name)} WHERE id=${mysql.escape(param.id)}`, (err, result)=>{
            let errRet = errorInfo.SUCCESS
            if (err) errRet = errorInfo.SQL_ERROR
            else if (result.affectedRows === 0) {
                errRet = errorInfo.AFFECTED_ROWS_ZERO
            }
            cb(errRet, err, result)
        })
    },

    delete(param, cb) {
        dbFish.exeSql(`DELETE FROM user WHERE id=${mysql.escape(param.id)}`, (err, result)=>{
            let errRet = errorInfo.SUCCESS
            if (err) errRet = errorInfo.SQL_ERROR
            else if (result.affectedRows === 0) {
                errRet = errorInfo.AFFECTED_ROWS_ZERO
            }
            cb(errRet, err, result)
        })
    },
}