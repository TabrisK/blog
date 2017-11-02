export default {
    platform: (() => {
        let platform = "desktop";
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)) {
            platform = "mobile";
        } else if (/iPad/i.test(window.navigator.userAgent)) {
            platform = "iPad";
        } else {
        }
        console.log("inner platform:", platform);
        return platform;
    })(),
    getStateParams() {
        let obj = {};
        let search = location.search;
        let couple = search.replace("?", "");
        if (!couple) return obj;
        couple = couple.split("&");
        couple.map((val, key) => {
            let ary = val.split("=");
            obj[ary[0]] = ary[1] || "true";
        });
        return obj;
    }
}