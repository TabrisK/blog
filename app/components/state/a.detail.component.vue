<template>
    <div>
        <section class="a-detail">
            <h1 class="title">{{info.title}}</h1>

            <p class="post-meta">
                <span><i class="fa fa-calendar-plus-o"></i>{{info.releaseTime | date("yyyy-MM-dd")}}</span>
                <span><i class="fa fa-eye" aria-hidden="true"></i>{{info.pv || 0}}</span>
                <span><i class="fa fa-commenting-o" aria-hidden="true"></i>{{info.commentCount || 0}}</span>
                <span><i>字数</i>{{info.length}}</span>
                <span><i class="fa fa fa-folder-o"></i>{{info.category}}</span>
            </p>

            <div v-show="article" class="a-content" v-md.github_md_css="article"></div>
            <div v-show="!article" style="padding-bottom: 10px;text-align: center;"><i
                    class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div>
        </section>
        <comment v-if="platform != 'mobile'" module="a.detail" :id="Number($route.params.id)"/>

        <comment-list module="a.detail" :id="Number($route.params.id)"/>
    </div>
</template>
<script>
    import {article} from "../../local_modules/blog-api";
    import utils from "../../local_modules/utils";
    import bus from "../../bus";

    export default {
        data() {
            return {
                info: {
                    "author": undefined,
                    "releaseTime": undefined,
                    "title": undefined,
                    "title_en": undefined,
                    "img": undefined,
                    "contenturl": undefined
                },
                article: "",
                platform: utils.platform
            }
        },
        methods: {
            async getArticleInfo() {
                let res = await article.getDetail({id: this.$route.params.id});//获得文章信息
                this.info = res.body;
                this.getArticle();
            },
            async getArticle() {
                let textRes = await this.$http.get(this.info.contenturl);//获得文章文本内容
                this.article = textRes.body;
            }
        },
        watch: {
            '$route'(to, from) {
                this.article = "";
                this.getArticleInfo();
                setTimeout(() => {
                    bus.$emit("comment-list:update");
                    bus.$emit("comment:reset");
                }, 0);
            }
        },
        computed: {},
        beforeMount() {
            this.getArticleInfo();
            if (this.$route.params.id)
                article.view({id: this.$route.params.id},{});
        },
        mounted() {}
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .a-detail {
        margin-top: 30px;
        padding: 0;

        h1.title {
            text-align: center;
            margin-bottom: 20px;
            font-family: Lato;
            font-weight: 300;
            font-size: 24px;
        }

        .post-meta {
            font-size: 13px;
            color: gray;
            text-align: center;
            span{
                margin-right: 35px;
                i {
                    padding-right: 4px;
                }
            }
        }

    }
</style>