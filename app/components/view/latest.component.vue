<template>
    <div class="latest">
        <h5>LATEST</h5>
        <ol>
            <li v-for="item in list">
                <router-link :to="{ name: 'a.detail', params: { id: item.id }}">
                    {{item.title}}
                </router-link>
            </li>
        </ol>
        <router-link :to="{ name: 'articles'}">更多</router-link>
    </div>
</template>
<script type="text/ecmascript-6">
    import {article} from "../../local_modules/blog-api";
    import cache from "../../local_modules/cache";

    export default {
        props: {},
        data() {
            return {
                list: []
            }
        },
        async beforeMount() {
            let res = cache.latest.get();
            if (!res) {
                res = await article.getList({}, {page: 1, size: 5});
                cache.latest.set(res);
            }
            this.list = this.list.concat(res.body);
        },
        mounted: function () {

        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .latest {
        padding-left: 15%;
        h5 {
            color: #009245;
            font-size: 24px;
            font-family: Silom;
        }
        ol {
            font-family: "Wawati SC";
            padding-left: 17px;
            margin-bottom: 4px;

            & + a {
                font-family: "Wawati SC";
            }
        }
    }
</style>