<template>
    <div class="header-bar">
        <span class="left">
            <a @click="$router.go(-1);" v-show="!$route.meta.topLayout"><i class="fa fa-chevron-left fa-2x"></i></a>
        </span>
        <span class="topic">{{$route.meta.str}}</span>
        <span class="right">
            <a class="toggle-pop-up" @click="togglePopUp()">
                <i class="fa fa-plus fa-2x" :class="{ 'pop-up-open': popup }"></i>
            </a>
        </span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        props: {
            popup: Boolean
        },
        data(){
            return {
            }
        },
        methods: {
            togglePopUp: function(){
                this.$emit("toggle-popup");
            }
        },
        computed: {
        }
    }
</script>