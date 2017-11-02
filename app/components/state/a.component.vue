<template>
    <div>
        <div class="primary-list">
            <div class="item" v-for="item in list">
                <router-link :to="{ name: 'a.detail', params: { id: item.id }}">
                    <!--<h2 class="brief">{{item.title}}</h2>
                    <h3>{{item.title_en}}</h3>
                    <article v-if="item.brief">{{item.brief}}</article>-->
                    <p class="title">{{item.title}}</p>
                    <p class="post-meta">
                        <span><i class="fa fa-calendar-plus-o"></i>{{item.releaseTime | date("yyyy-MM-dd")}}</span>
                        <span><i class="fa fa-eye" aria-hidden="true"></i>{{item.pv || 0}}</span>
                        <span><i class="fa fa-commenting-o" aria-hidden="true"></i>{{item.commentCount || 0}}</span>
                        <span><i>字数</i>{{item.length}}</span>
                        <span><i class="fa fa fa-folder-o"></i>{{item.category}}</span>
                    </p>
                </router-link>
            </div>
        </div>
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
            async getArticleList(page, size){
                let res = await article.getList({}, {page: page || 1, size: size || 20});
                this.list = this.list.concat(res.body);
            }
        },
        computed: {},
        beforeMount(){
            this.getArticleList();
        }
    }
</script>