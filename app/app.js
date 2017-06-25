/**
 * Created by Helex on 2017/1/31.
 */
"use strict";

require('file-loader!./index.html');

import '!style-loader!css-loader!sass-loader!./assets/scss/style.scss';
import Vue from 'vue';
import _ from 'lodash';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import vRouter from './router';
//自定义组件、模块、指令
import Plugins from './directives/plugins';
import Views from './components/view/views';
import Filters from './filters';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Plugins);
Vue.use(Views);
Vue.use(Filters);

vRouter.beforeEach((to, from, next) => {
    console.log(this);
    next();
});

vRouter.afterEach((to, from) => {
    (function (to) {
        window.setTimeout(() => {
            var z = 0;
            to.path.split("").map((val, key) => {
                if (val == "/") z++
            });
            let newContent = _.last(document.getElementsByClassName("content"));
            newContent.style.zIndex = z;//根据path中/的数量决定z-index;
        }, 10);
    })(to);
});

let app = new Vue({
    el: "#app",
    watch: {
        '$route' (to, from) {
            if (from.path == "/") {
                this.stateTransition = "";
            } else if (to.path.match(from.path)) {//前往子页
                this.stateTransition = 'slide-left';
            } else if (from.path.match(to.path)) {//返回父级页
                this.stateTransition = 'slide-right';
            } else {//两页没有任何关系
                if (to.meta.xIndex == undefined || from.meta.xIndex == undefined)//如果没定义了左右滑动关系
                    this.stateTransition = "";
                else//定义了左右滑动关系
                    this.stateTransition = to.meta.xIndex < from.meta.xIndex ? 'slide-right-concat' : 'slide-left-concat';
            }
            this.$router.previous = from;
        }
    },
    data: {
        stateTransition: '',
        popup: false//popup-box默认关闭
    },
    methods: {},
    computed: {},
    router: vRouter,
    components: {}
});