/**
 * Created by Helex on 2017/2/1.
 */
"use strict";
import VueRouter from 'vue-router';

const Article = () => System.import('./components/state/a.component.vue');
const ArticleDetail = () => System.import('./components/state/a.detail.component.vue');
const Photo = () => System.import('./components/state/p.component.vue');
const Me = () => System.import('./components/state/m.component.vue');

const navNode = {//左右布局
    template: `
    <div class="two-part-layout">
        <section class="left-block">
            <div class="bg">
                <router-view class="content"></router-view>
            </div>
        </section>
        <section class="right-block">
            <profile></profile>
        </section>
    </div>
  `
};
const detailNode = {//左中右布局
    template: `
    <div class="three-part-layout">
        <section class="left-block">
            <hot></hot>
            <latest></latest>
        </section>
        <section class="center-block">
            <div class="bg">
                <router-view class="content"></router-view>
            </div>
        </section>
        <section class="right-block">
            <profile></profile>
        </section>
    </div>
  `
};

const routes = [
    {path: "", redirect: "/nav/a"},
    {name: "photo", path: "/p", meta: {str: "写真"}, component: Photo},
    {name: "me", path: "/m", meta: {str: "关于"}, component: Me},
    {
        path: '/nav', component: navNode,
        children: [
            {name: "articles", path: "a", meta: {str: "文章"}, component: Article},

        ]
    },
    {
        path: '/main', component: detailNode,
        children: [
            {name: "a.detail", path: "a/:id", meta: {str: "文章"}, component: ArticleDetail},
        ]
    }

];

const vRouter = new VueRouter({
    routes,
    mode: 'history',//无#模式（statepush模式）
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

export default vRouter;