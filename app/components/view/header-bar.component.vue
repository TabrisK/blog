<template>
    <div>
        <div class="bg">
            <div class="header-bar">
        <span class="left">
            <a @click="$router.go(-1);" v-show="!$route.meta.topLayout"><i class="fa fa-chevron-left fa-2x"></i></a>
        </span>
                <span class="topic">HELEX的造作 - {{$route.meta.str}}</span>
                <span class="right">
            <input placeholder="搜索造作">
                    <!--<a class="toggle-pop-up" @click="togglePopUp()">-->
                    <!--<i class="fa fa-plus fa-2x" :class="{ 'pop-up-open': popup }"></i>-->
                    <!--</a>-->
        </span>
            </div>
        </div>
        <nav class="nav-bar">
            <router-link :class="{ active: isActive('b')}" :to="{ name: 'brief'}">精选</router-link>
            <router-link :class="{ active: isActive('a')}" :to="{ name: 'articles'}">文章</router-link>
            <router-link :class="{ active: isActive('p')}" :to="{ name: 'photo'}">摄影</router-link>
            <router-link :class="{ active: isActive('m')}" :to="{ name: 'me'}">HEL</router-link>
        </nav>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props: {
            popup: Boolean
        },
        data(){
            return {}
        },
        methods: {
            togglePopUp: function () {
                this.$emit("toggle-popup");
            },
            isActive(path){
                return (new RegExp("^\/" + path)).test(this.$route.path);
            }
        },
        computed: {}
    }
</script>