/**
 * Created by Helex on 2017/2/3.
 */
"use strict";
var bodyParser = require('body-parser');
module.exports = api;

function api(app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.get("/api/vehicles", function (req, res) {
        res.send();
    });

    app.get("/api/article/page/:page/size/:size", function (req, res) {
        res.send([{
            id: 1,
            title: "建站讣告",
            img: "assets/img/logo.png",
            brief: "HELEX的造作成立啦！",
            createTime: 1496825314081,
            updateTime: 1496825314081,
            category: "通知"
        }]);
    });

    app.post("/api/vehicles", function (req, res) {
        req.body.id = vehicleInfo.length;
        vehicleInfo.push(req.body);
        res.status(200).send({code: 0});
    })
}

let vehicleInfo = [
    {
        "id": 1,
        "plate": "沪A7xxxx",
        "brand": "VOLVO",
        "contact": "HELEX",
        "phone": "13262607231"
    },
    {
        "id": 2,
        "plate": "沪A3xxxx",
        "brand": "BMW",
        "contact": "Nick",
        "phone": "1xxxxxxxxxx"
    },
    {
        "id": 5,
        "plate": "沪C7Nxxxx",
        "brand": "Cadillac",
        "contact": "Obama",
        "phone": "1xxxxxxxxxx"
    },
    {
        "id": 4,
        "plate": "沪ANxxxx",
        "brand": "Lexus",
        "contact": "Rosemond",
        "phone": "1xxxxxxxxxx"
    },
    {
        "id": 0,
        "plate": "沪A2xxxx",
        "brand": "Benz",
        "contact": "Sherry",
        "phone": "1xxxxxxxxxx"
    },
    {
        "id": 6,
        "plate": "浙Nxxxx",
        "brand": "Chevrolet",
        "contact": "Trump",
        "phone": "1xxxxxxxxxx"
    },
    {
        "id": 3,
        "plate": "沪B1xxxx",
        "brand": "Audi",
        "contact": "Yijun",
        "phone": "1xxxxxxxxxx"
    }
];