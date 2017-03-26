var express = require("express");
var api = require("./api");
var history = require('connect-history-api-fallback');//服务端配置单页应用
var path = require('path');
var app = express();
// app.get("/", function(req, res){
//     res.send("Hello World!");
// });

app.use(express.static(path.join(__dirname, 'dist')));
api(app);
//app.use(express.static(__dirname));
// app.use(history({
// }));//服务端配置为单页应用模式
app.listen(3000);