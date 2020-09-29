const dbFish = require('../../../db/fish')
const dbUtils = require('../../../utils/dbUtils')
const uuid = require('../../../utils/uuid')
const mysql = require('mysql')

module.exports = {
    query(param, cb) {
        const sql = dbUtils.makeSelectByParam('user', param)
        dbFish.exeSql(sql, cb)
    },

    login(param, cb) {
        dbFish.exeSql(`SELECT * FROM user WHERE account=${mysql.escape(param.account)} AND pwd=${mysql.escape(param.pwd)}`, cb)
    },

    register(param, cb) {
        dbFish.exeSql(`SELECT * FROM user WHERE account=${mysql.escape(param.account)} LIMIT 1`, (err, results)=>{
            if (err) {
                cb('异常错误', results);
                return
            }

            if (results && results.length) {
                cb('账户已存在', null)
                return
            }

            dbFish.exeSql(`INSERT INTO user(id, account, pwd, name) VALUES(${mysql.escape(uuid())}, ${mysql.escape(param.account)}, ${mysql.escape(param.pwd)}, ${mysql.escape(param.name)})`, (err, result)=>{
                if (err) {
                    cb('注册失败', null)
                } else {
                    cb(null, null)
                }
            })
        })
    },

    update(param, cb) {
        dbFish.exeSql(`UPDATE user SET pwd=${mysql.escape(param.pwd)}, name=${mysql.escape(param.name)} WHERE id=${mysql.escape(param.id)}`, cb);
    },

    delete(param, cb) {
        dbFish.exeSql(`DELETE FROM user WHERE id=${mysql.escape(param.id)}`, cb);
    },
}