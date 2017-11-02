/**
 * Created by zhangjiawei on 2017/7/18.
 */
import utils from "../local_modules/utils";

export default {
    install: function (Vue, options) {

        //使用假数据拦截器
        Vue.http.interceptors.push(function (request, next) {


            let params = location.hash.split("?")[1];
            let fake = params ? /fake=true/.exec(params) : "";//假数据开关。不需要任何授权配置及API支持

            if (fake) {
                // modify request
                //request.method = 'POST';
                if (request.method == "GET") {
                    request.url = request.url.replace("/api", "/json").concat(".json");
                }
            }

            //continue to next interceptor
            next((response) => {
                // modify response
            });

        });


        //管理员登录拦截
        Vue.http.interceptors.push(function (request, next) {
            let admin = localStorage.admin;
            if (admin) {
                if (
                    "/api/a{/id}/view" == request.url//pv请求
                ) {
                    return next(request.respondWith({
                        admin: 1
                    }, {
                        status: 200,
                        statusText: 'admin view'
                    }));
                }
            }
            //continue to next interceptor
            next((response) => {
                // modify response
            });

        });
    }
}