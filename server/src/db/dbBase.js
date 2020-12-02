
const mysql = require('mysql')
const dbUtils = require('../utils/dbUtils')

class DBBase {
    constructor(cfg) {
        this.pool = mysql.createPool(cfg)
        console.log('...db createPool:', cfg)
    }

    execute(sql, cb) {
        console.log('...', sql)
        if (this.pool) {
            this.pool.getConnection((err, conn)=>{
                if (!err && conn) {
                    conn.query(sql, (error, results)=>{
                        cb(error, dbUtils.getQueryResultByDbResult(results))

                        if (error) {
                            console.log(error)
                        }
                    })
                } else {
                    console.log(err)
                    cb('get connection error', null)
                }

                this.pool.releaseConnection(conn);
            })
        } else {
            console.log('connection is null')
            cb('connection is null', null)
        }
    }

    disconnect() {
        this.pool = null
    }
}

module.exports = DBBase;