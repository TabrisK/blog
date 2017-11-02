<template>
    <div class="hot">
        <h5>HOT</h5>
        <ol>
            <li v-for="item in list">
                <router-link :to="{ name: 'a.detail', params: { id: item.id }}">
                    {{item.title}}
                </router-link>
            </li>
        </ol>
    </div>
</template>
<script type="text/ecmascript-6">
    import {hot} from "../../local_modules/blog-api";
    import cache from "../../local_modules/cache";

    export default {
        props: {},
        data() {
            return {
                list: []
            }
        },
        async beforeMount() {
            let res = cache.hot.get();
            if (!res) {
                res = await hot.get();
                cache.hot.set(res);
            }
            this.list = this.list.concat(res.body);

        },
        mounted: function () {

        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .hot {
        padding-left: 15%;
        h5 {
            color: #8cc63f;
            font-size: 24px;
            font-family: Silom;
        }
        ol {
            font-family: "Wawati SC";
            padding-left: 17px;
        }
    }
</style>