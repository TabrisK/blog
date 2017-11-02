<template>
    <section class="profile">
        <img src="../../assets/img/portrait.jpg">
        <p><i class="fa fa-quote-left" aria-hidden="true"></i></p>
        <p>君が今僕を支えて</p>
        <p>僕が今君を支える</p>
        <p><i class="fa fa-quote-right" aria-hidden="true"></i></p>
        <p>
            <a target="_blank" href="https://github.com/TabrisK"><b></b>GitHub</a>
            <a target="_blank" href="https://www.zhihu.com/people/tabris-55-17/activities">知乎</a>
        </p>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},
        data() {
            return {
                list: []
            }
        },
        beforeMount() {
        },
        mounted: function () {

        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .profile {
        padding:0 15px;
        text-align: center;
        max-width: 250px;
        margin: 0 auto;
        img{
            width: 135px;
        }
        p:nth-child(2){
            text-align: left;
        }
        p:nth-child(5){
            text-align: right;
        }
        p:nth-child(6) > a:before{
            display: inline-block;
            vertical-align: middle;
            margin-right: 3px;
            content: " ";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #ad57ff;
        }
    }
</style>