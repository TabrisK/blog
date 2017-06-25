/**
 * Created by zhangjiawei on 2017/6/8.
 */

let monthMap = [
    {
        JP: "睦月（むつき）",
        EN: "Jan"
    },
    {
        JP: "如月（きさらぎ）",
        EN: "Feb"
    },
    {
        JP: "弥生（やよい）",
        EN: "Mar"
    },
    {
        JP: "卯月（うづき）",
        EN: "Apr"
    },
    {
        JP: "皐月（さつき）",
        EN: "May"
    },
    {
        JP: "水無月（みなづき）",
        EN: "Jun"
    },
    {
        JP: "文月（ふみづき、ふづき）",
        EN: "Jul"
    },
    {
        JP: "葉月（はづき）",
        EN: "Aug"
    },
    {
        JP: "長月（ながつき）",
        EN: "Sep"
    },
    {
        JP: "神無月（かんなづき）",
        EN: "Oct"
    },
    {
        JP: "霜月（しもつき）",
        EN: "Nov"
    },
    {
        JP: "師走（しわす）",
        EN: "Dec"
    }
];

export default {
    install: function (Vue, options) {
        Vue.filter("date", date);
    }
}

function date(val, pattern) {
    if (!pattern)
        pattern = "yyyy-MM-dd";
    if (pattern == "CN" || pattern == "EN") {
        let tempDate = dateFormat(new Date(val), "yyyy-MM-dd");
        tempDate = tempDate.split("-");
        let y = pattern == "CN" ? tempDate[0] + "年" : tempDate[0],
            m = pattern == "CN" ? Number(tempDate[1]) + "月" : monthMap[Number(tempDate[1]) - 1].EN,
            d = pattern == "CN" ? Number(tempDate[2]) + "日" : Number(tempDate[2]);
        tempDate = pattern == "CN" ? [y, m, d] : [m, d, y];
        return tempDate.join(" ");
    } else
        return dateFormat(new Date(val), pattern);
}


function dateFormat(date, format) {
    if (format === undefined) {
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}