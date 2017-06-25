<template>
    <div>
        <section class="a-detail">
            <p>文章内容</p>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import {article} from "../../local_modules/blog-api";
    export default{
        data(){
            return {
                list: []
            }
        },
        methods: {
            async getArticle(){
            }
        },
        computed: {},
        beforeMount(){
            this.getArticle();
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "~scss/variables.scss";

    .a-detail {
        margin-top: 30px;
    }
</style>