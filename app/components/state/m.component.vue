<template>
    <div>
        <section class="me" v-html="article"></section>
    </div>
</template>
<script type="text/ecmascript-6">
    import {me} from "../../local_modules/blog-api";
    import marked from "marked";

    export default{
        data(){
            return {
                article: ""
            }
        },
        methods: {
            async getMe(){
                let res = await me.get();
                let textRes = await this.$http.get(res.body.article);
                this.article = marked(textRes.body);//插入markdown编译后信息
            }
        },
        computed: {},
        beforeMount(){
            this.getMe();
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>