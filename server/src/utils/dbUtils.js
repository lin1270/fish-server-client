const queryPre = require('../../config/queryPre.json')

module.exports = {
    getQueryResultByDbResult(data) {
        if (!data) return data
        return JSON.parse(JSON.stringify(data));
    },

    makeSelectByParam(table, param) {
        const conditions = []
        for(const i in param) {
            for(let j in queryPre) {
                if (i.startsWith(j)) {
                    const value = queryPre[j] == 'LIKE' ? ' "%' + param[i] + '%"' : param[i]
                    conditions.push(`${i.substring(j.length)} ${queryPre[j]} ${value}`)
                    break
                }
            }
        }

        const condtionStr = conditions.length ? `WHERE ${conditions.join('AND')}` : ''

        return `SELECT * FROM ${table} ${condtionStr}`
    },
}