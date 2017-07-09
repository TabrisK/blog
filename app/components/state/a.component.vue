<template>
    <div>
        <ul class="primary-list">
            <li v-for="item in list">
                <router-link :to="{ name: 'a.detail', params: { id: item.id }, query: {title: item.title}}">
                    <div class="info">
                        <time>{{ item.updateTime | date('EN') }}</time>
                        <span>{{item.category}}</span>
                    </div>
                    <div class="outline">
                        <figure class="cover">
                            <img :src="item.img">
                        </figure>
                        <section class="ref">
                            <h2>{{item.title}}</h2>
                            <p class="contact">{{item.brief}}</p>
                        </section>
                    </div>
                </router-link>
            </li>
        </ul>
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
                let res = await article.getList({},{page: page || 1, size: size || 20});
                console.log(res.data);
                for(let item of res.data){
                    this.$http.get(item.contenturl).then(response => {
                        console.log(response);
                    });
                }
                //this.list = this.list.concat(res.data);
            }
        },
        computed: {},
        beforeMount(){
            this.getArticleList();
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "~scss/variables.scss";

    .mapBg {
        height: 100%;
        position: absolute;
        width: 100%;
        & > div {
            height: 100%;
        }
    }
</style>