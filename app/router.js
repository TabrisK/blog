/**
 * Created by Helex on 2017/2/1.
 */
"use strict";
import VueRouter from 'vue-router';

const Default = () => System.import('./components/state/h.component.vue');
const Article = () => System.import('./components/state/a.component.vue');
const ArticleDetail = () => System.import('./components/state/a.detail.component.vue');
const Photo = () => System.import('./components/state/p.component.vue');
const Me = () => System.import('./components/state/m.component.vue');

const routes = [
    {path: "", redirect: "/b"},
    {name: "brief", path: "/b", meta: {str: "精选"}, component: Default},
    {name: "articles", path: "/a", meta: {str: "文章"}, component: Article},
    {name: "a.detail", path: "/a/:id", meta: {str: "文章", back: {cn: "文章", en: "articles"}}, component: ArticleDetail},
    {name: "photo", path: "/p", meta: {str: "写真"}, component: Photo},
    {name: "me", path: "/m", meta: {str: "HEL"}, component: Me}

];

const vRouter = new VueRouter({
    routes,
    //mode: 'history'//无#模式（statepush模式）
});

export default vRouter;