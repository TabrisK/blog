/**
 * Created by Helex on 2017/1/31.
 */
"use strict";

import img from './favicon.ico';
import '!style-loader!css-loader!github-markdown-css';
import '!style-loader!css-loader!sass-loader!./assets/scss/style.scss';

import 'code-prettify';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import vRouter from './router';
//自定义组件、模块、指令
import Plugins from './directives/plugins';
import Views from './components/view/views';
import Filters from './filters';
import Interceptor from './local_modules/http-interceptor';

console.info(process.env.NODE_ENV);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Plugins);
Vue.use(Views);
Vue.use(Filters);
Vue.use(Interceptor);

vRouter.beforeEach((to, from, next) => {
    if (!to.hash)//配合vue-router的history模式，#后内容已变成anchor而非router的path
        next();
    else
        next(false);
});

vRouter.afterEach((to, from) => {
});

let app = new Vue({
    el: "#app",
    watch: {},
    data: {},
    methods: {},
    computed: {},
    router: vRouter,
    components: {}
});