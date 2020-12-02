const fs = require('fs')

const config = {}

const dir = __dirname

let pos = dir.lastIndexOf('\\'); if (pos < 0) pos =dir.lastIndexOf('/')
config.table = dir.substring(pos + 1)

const parentStr = dir.substring(0, pos)
pos = parentStr.lastIndexOf('\\'); if (pos < 0) pos =parentStr.lastIndexOf('/')
config.service = parentStr.substring(pos + 1)


module.exports = config;