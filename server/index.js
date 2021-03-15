var express = require("express");
var server = express();
const { MY_PORT } = require("./secret.config");
const data = require("./api/data.js");

//设置允许跨域访问该服务.
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 终端输入:> node index.js 访问
server.listen(MY_PORT);
console.log("已成功监听服务器端口");

// --------【API接口路径】---------
// 数据管理：Data Controller
server.use("/data", data);