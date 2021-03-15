var express = require('express');
var router = express.Router();
var fs = require("fs");

// 格式化响应请求
function resSend(res, result) {
    if (typeof result === 'undefined') {
        res.send({
            code: '1',
            msg: '操作失败'
        })
    }
    else if (typeof result === "object") {
        res.send(result)
    }
    else {
        res.send({
            code: '0',
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

// 获取数据列表
router.get("/getList", function (req, res) {
    var { dataName, view, sectionIndex, CardIndex } = req.query;
    if (dataName && !view && !sectionIndex && !CardIndex) {
        console.log("===初始化数据===")
        fs.readFile("../static/json/" + dataName + ".json", function (err, data) {
            if (err) {
                console.log("数据读取失败");
            } else {
                console.log("数据读取成功");
                resSend(res, data)
            }
        })
    } else if (dataName && view && sectionIndex && CardIndex) {
        console.log("===更新数据===")
        fs.readFile("../static/json/" + dataName + ".json", function (err, data) {
            if (err) {
                console.log("数据读取失败");
            } else {
                console.log("数据读取成功");
                var beforeData = JSON.parse(data.toString());   // 数组
                var afterData = deepCopy(beforeData);
                afterData[sectionIndex].cardData[CardIndex].view = Number(view);
                var writeData = JSON.stringify(afterData);

                fs.writeFile("../static/json/" + dataName + ".json", writeData, function (err) {
                    if (err) {
                        console.log("写入失败");
                    } else {
                        console.log("写入成功");
                        fs.readFile("../static/json/" + dataName + ".json", function (err, data) {
                            if (err) {
                                console.log("数据读取失败");
                            } else {
                                console.log("数据读取成功");
                                resSend(res, data)
                            }
                        })
                    }
                })

            }
        })
    } else {
        console.log("===参数有误===")
    }
})

module.exports = router;