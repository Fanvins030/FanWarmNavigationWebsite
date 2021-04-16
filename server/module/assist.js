// 格式化响应请求
function resSend(res, result) {
    if (typeof result === 'undefined') {
        res.send({
            code: 1,
            msg: '操作失败'
        })
    }
    else {
        res.send({
            code: 0,
            result: result
        })
    }
}

// 深拷贝（主要用于JSON格式化）
function deepCopy(data) {
    var newData = Array.isArray(data) ? [] : {}
    for (var k in data) {
        if (typeof data[k] == "object") {
            newData[k] = deepCopy(data[k]);
        } else {
            newData[k] = data[k];
        }
    }
    return newData;
}

module.exports = {
    resSend,
    deepCopy
}