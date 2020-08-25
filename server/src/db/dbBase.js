
const mysql = require('mysql')
const dbUtils = require('../utils/dbUtils')

class DBBase {
    constructor(cfg) {
        this.connection = mysql.createConnection(cfg)
        this.connection.connect();

        console.log('...db connect:', cfg)
    }

    execute(sql, cb) {
        if (this.connection) {
            this.connection.query(sql, (error, results)=>{
                cb(error, dbUtils.getQueryResultByDbResult(results))
            })
        } else {
            cb('connection is null', null)
        }
    }

    disconnect() {
        if (this.connection) this.connection.end()
        this.connection = null
    }
}

module.exports = DBBase;