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

    }
}