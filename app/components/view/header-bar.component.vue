<template>
    <div>
        <div class="bg">
            <div class="header-bar">
                <span class="topic">HELEX的造作 - {{$route.meta.str}}</span>
                <span class="right">
            <input placeholder="搜索造作">
        </span>
            </div>
        </div>
        <nav class="nav-bar">
            <section v-if="!$route.meta.back">
                <router-link :class="{ active: isActive('b')}" :to="{ name: 'brief'}">精选</router-link>
                <router-link :class="{ active: isActive('a')}" :to="{ name: 'articles'}">文章</router-link>
                <router-link :class="{ active: isActive('p')}" :to="{ name: 'photo'}">摄影</router-link>
                <router-link :class="{ active: isActive('m')}" :to="{ name: 'me'}">HEL</router-link>
            </section>
            <section class="title" v-if="$route.meta.back">
                <span class="back" @click="$router.push({name: $route.meta.back.en})"><i class="fa fa-arrow-left"></i>{{$route.meta.back.cn}}</span>{{$route.query.title}}
            </section>
        </nav>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props: {},
        data(){
            return {}
        },
        methods: {
            isActive(path){
                return (new RegExp("^\/" + path)).test(this.$route.path);
            }
        },
        computed: {},
        mounted: function(){
        }
    }
</script>