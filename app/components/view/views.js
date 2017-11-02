/**
 * Created by zhangjiawei on 2017/6/7.
 */

export default {
    install: function(Vue, options){
        Vue.component(
            'baidu-map',
            () => System.import('./baidu-map.component.vue')
        );

        Vue.component(
            'header-bar',
            () => System.import('./header-bar.component.vue')
        );

        Vue.component(
            'comment',
            () => System.import('./comment.component.vue')
        );

        Vue.component(
            'comment-list',
            () => System.import('./comment-list.component.vue')
        );

        Vue.component(
            'slide-vc',
            () => System.import('./slide-vc.component.vue')
        );

        Vue.component(
            'error-message',
            () => System.import('./error-message.component.vue')
        );

        Vue.component(
            'hot',
            () => System.import('./hot.component.vue')
        );
        Vue.component(
            'latest',
            () => System.import('./latest.component.vue')
        );
        Vue.component(
            'profile',
            () => System.import('./profile.component.vue')
        );
        Vue.component(
            'right-panel',
            () => System.import('./right-panel.component.vue')
        );

    }
}