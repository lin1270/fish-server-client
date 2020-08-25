const dbcfg = require('../../config/db.json')
const DBBase = require('./dbBase')
var db = new DBBase(dbcfg.fish)

module.exports = {
    exeSql(sql, cb) {
        db.execute(sql, cb);
    }
}