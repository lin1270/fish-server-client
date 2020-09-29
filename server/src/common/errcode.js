var errorInfo = {
    SUCCESS:            { code: 0, msg: '操作成功' },
    FAIL:               { code: 1, msg: '操作失败' },
    AFFECTED_ROWS_ZERO: { code: 2, msg: '操作失败' },
    DATA_NOT_EXIST:     { code: 3, msg: '数据不存在' },



    SQL_ERROR:          { code: 999, msg: '异常' },
}


module.exports = errorInfo;