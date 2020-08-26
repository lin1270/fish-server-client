import moment from 'moment'
import store from '@/store/index'

let util = {
    // 格式化时间
    formatTime (value, fmt='YYYY-MM-DD HH:mm:ss') {
        let time = moment(value).format(fmt)
        return time
    },
    // 格式化日期
    formatDataTime (value) {
        let time = moment(value).format('YYYY-MM-DD')
        return time
    },

    // 格式化日期
    formatDataTimeMD (value) {
        let time = moment(value).format('MM-DD')
        return time
    },

    // 格式化金额
    formatMoney (value) {
        let data = value
        if (typeof data !== 'string') {
            data = data.toString()
        }
        if (data.indexOf('.') > -1) {
            return data
        } else {
            let money = parseFloat(data).toFixed(2)
            return money
        }
    },

    // 权限判断
    hasRole (value) {
        return true;
        if (!value) return
        let actions = store.getters.getActionList || ''
        if (!actions) return
        let success = false
        actions.map(v => {
            if (v === value) {
                success = true
                return false
            }
        })
        if (success) {
            return true
        } else {
            return false
        }
    },

    isPhone(str) {
        return (/^1[3456789]\d{9}$/.test(str))
    }
}

export default util