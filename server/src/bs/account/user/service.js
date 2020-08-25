const dbFish = require('../../../db/fish')
const dbUtils = require('../../../utils/dbUtils')
const uuid = require('../../../utils/uuid')

module.exports = {
    query(param, cb) {
        const sql = dbUtils.makeSelectByParam('user', param)
        dbFish.exeSql(sql, cb)
    },

    login(param, cb) {
        dbFish.exeSql(`SELECT * FROM user WHERE account="${param.account}" AND pwd="${param.pwd}"`, cb)
    },

    register(param, cb) {
        dbFish.exeSql(`SELECT * FROM user WHERE account="${param.account}" LIMIT 1`, (err, results)=>{
            if (err) {
                cb('异常错误', results);
                return
            }

            if (results && results.length) {
                cb('账户已存在', null)
                return
            }

            dbFish.exeSql(`INSERT INTO user(id, account, pwd, name) VALUES("${uuid()}", "${param.account}", "${param.pwd}", "${param.name}")`, (err, result)=>{
                if (err) {
                    cb('注册失败', null)
                } else {
                    cb(null, null)
                }
            })
        })
    }
}