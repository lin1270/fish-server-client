import moment from 'moment'

let formatter = {
    // 格式化时间
    formatTime (h, params) {
        if (!params.row[params.column.key]) {
            return h('span', '')
        } else {
            let time = moment(params.row[params.column.key]).format('YYYY-MM-DD HH:mm:ss')
            return h('span', time)
        }
    },

    // 格式化金额
    formatMoney (h, params) {
        if (params.row[params.column.key] === undefined) return h('span', '')
        let data = params.row[params.column.key].toString()
        if (data.indexOf('.') > -1) {
            return h('span', data)
        } else {
            let money = parseFloat(data).toFixed(2)
            return h('span', money)
        }
    },

    // 小数转百分号
    formatDigital(h, params) {
        if (params.row[params.column.key] === undefined) return h('span', '')
        let scale = ((Math.round((params.row[params.column.key] * 10000)))/100.00).toFixed(2) + '%'
        return h('span', scale)
    }
}

export default formatter