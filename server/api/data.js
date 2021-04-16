var express = require('express');
var router = express.Router();
var fs = require("fs");
var { resSend, deepCopy } = require("../module/assist.js");

// 获取数据列表
router.post("/getList", function (req, res) {
    var { dataName, view, sectionIndex, CardIndex } = req.body;
    if (dataName && !view && !sectionIndex && !CardIndex) {
        console.log("===初始化数据===")
        fs.readFile("../static/json/" + dataName + ".json", function (err, data) {
            if (err) {
                console.log("数据读取失败");
            } else {
                console.log("数据读取成功");
                resSend(res, JSON.parse(data.toString()))
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
                                resSend(res, JSON.parse(data.toString()))
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