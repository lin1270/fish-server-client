const queryPre = require('../../config/queryPre.json')
const mysql = require('mysql')

module.exports = {
    getQueryResultByDbResult(data) {
        if (!data) return data
        return JSON.parse(JSON.stringify(data));
    },

    makeSelectByParam(table, columns, param) {
        const conditions = []
        for(const i in param) {
            for(let j in queryPre) {
                if (i.startsWith(j)) {
                    const mysqlParam = mysql.escape(param[i])
                    const value = queryPre[j] == 'LIKE' ? ` concat('%', ${mysqlParam}, '%')` : mysqlParam
                    conditions.push(` ${i.substring(j.length)} ${queryPre[j]} ${value} `)
                    break
                }
            }
        }

        const condtionStr = conditions.length ? `WHERE ${conditions.join('AND')}` : ''

        return `SELECT ${columns} FROM ${table} ${condtionStr}`
    },

    isItemExist(db, table, col, colValue, cb) {
        db.exeSql(`SELECT * FROM ${table} WHERE ${col}=${mysql.escape(colValue)} LIMIT 1`, (err, results)=>{
            if (err) {
                cb(false, err, results);
                return
            }

            if (results && results.length) {
                cb(true, err, results)
                return
            }

            cb(false, err, results)
        })
    },

    removeItemNotInTable(param, tableDefine) {
        for(let key in param) {
            if (!tableDefine.includes(key)) delete param[key]
        }
    }
}