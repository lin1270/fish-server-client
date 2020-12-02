var errorInfo = {
    SUCCESS:            0,
    FAIL:               1,
    AFFECTED_ROWS_ZERO: 2,
    DATA_NOT_EXIST:     3, 



    SQL_ERROR:          999, 



    errStr: [],
}


errorInfo.errStr[errorInfo.SUCCESS] = '操作成功'
errorInfo.errStr[errorInfo.FAIL] = '操作失败'
errorInfo.errStr[errorInfo.AFFECTED_ROWS_ZERO] = '操作失败'
errorInfo.errStr[errorInfo.DATA_NOT_EXIST] = '数据不存在'




errorInfo.errStr[errorInfo.SQL_ERROR] = '异常'


module.exports = errorInfo;