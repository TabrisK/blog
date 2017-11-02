/**
 * Created by zhangjiawei on 2017/6/7.
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export let article = Vue.resource('/api/article', {}, {
    getList: {method: 'GET', url: '/api/a'},
    getDetail: {method: 'GET', url: '/api/a{/id}'},
    view: {method: 'POST', url: '/api/a{/id}/view'}
});
export let me = Vue.resource('/api/me', {}, {
    get: {method: 'GET', url: '/api/me'}
});
export let hot = Vue.resource('/api/hot', {}, {
    get: {method: 'GET', url: '/api/hot'}
});
export let comment = Vue.resource('/api/comment', {}, {
    set: {method: 'POST', url: '/api/comment'},
    getList: {method: 'GET', url: '/api/comment{/module}{/id}'}
});

export let character = Vue.resource(null, {}, {
    index: {method: 'GET', url: '/api/character'},
    search: {method: 'POST', url: '/api/character/search'},
    add: {method: 'POST', url: '/api/character'},
    verify: {method: 'POST', url: '/api/character{/id}/verify'},
    setMain: {method: 'POST', url: '/api/character{/id}/set-main'},
    remove: {method: 'DELETE', url: '/api/character{/id}'}
});