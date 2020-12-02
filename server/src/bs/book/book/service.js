const dbFish = require('../../../db/fish')
const dbUtils = require('../../../utils/dbUtils')
const uuid = require('../../../utils/uuid')
const mysql = require('mysql')
const errcode = require('../../../common/errcode')
const errorInfo = require('../../../common/errcode')
const config = require('./config')

module.exports = {
    query(param, cb) {
        const sql = dbUtils.makeSelectByParam(config.table, '*', param)
        dbFish.exeSql(sql, (error, result)=>{
            return cb(error ? errcode.SQL_ERROR : errcode.SUCCESS, error, result)
        })
    },

    add(param, cb) {
        const fields = []
        const values = []
        for(let key in param) {
            fields.push(key)
            values.push(mysql.escape(param[key]))
        }
        fields.push('id')
        values.push(mysql.escape(uuid()))
        let sqlStr = `INSERT INTO ${config.table}(${fields.join(',')})VALUES(${values.join(',')})`
        dbFish.exeSql(sqlStr, (err, result)=>{
            cb(err ? errcode.SQL_ERROR : errcode.SUCCESS, err, result)
        })
    },

    update(param, cb) {
        const tempParam = {...param}
        delete tempParam.id
        const sets = []
        for(let key in tempParam) {
            sets.push(`${key}=${mysql.escape(tempParam[key])}`)
        }
        dbFish.exeSql(`UPDATE ${config.table} SET ${sets.join(',')} WHERE id=${mysql.escape(param.id)}`, (err, result)=>{
            let errRet = errorInfo.SUCCESS
            if (err) errRet = errorInfo.SQL_ERROR
            else if (result.affectedRows === 0) {
                errRet = errorInfo.AFFECTED_ROWS_ZERO
            }
            cb(errRet, err, result)
        })
    },

    delete(param, cb) {
        dbFish.exeSql(`DELETE FROM ${config.table} WHERE id=${mysql.escape(param.id)}`, (err, result)=>{
            let errRet = errorInfo.SUCCESS
            if (err) errRet = errorInfo.SQL_ERROR
            else if (result.affectedRows === 0) {
                errRet = errorInfo.AFFECTED_ROWS_ZERO
            }
            cb(errRet, err, result)
        })
    },
}