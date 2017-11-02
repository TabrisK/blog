<template>
    <div class="comment-list">
        <div v-for="item in comments" class="item">
            <h4>{{item.name}}
                <time>{{item.updateTime | date("yy/MM/dd hh:mm")}}</time>
            </h4>
            <p>{{item.content}}</p>
            <label class="operation">
                <i class="fa fa-reply" aria-hidden="true"
                   @click="item.showComment = !item.showComment;"></i>
                <a @click="toggleReply(item)">{{item.showReply?"隐藏":""}}{{item.replyCount}}条回复</a>
            </label>
            <comment v-if="item.showComment && platform !='mobile'" :module="module" :id="id" :reply-target="item._id"/>
            <div style="margin-left: 10px;border-left: 3px solid green;" v-show="item.showReply">
                <comment-list v-if="item.replies.length > 0" :module="module" :id="id"
                              :list="item.replies"></comment-list>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from "../../bus";
    import utils from "../../local_modules/utils";
    import {comment} from "../../local_modules/blog-api";

    async function getList(vm, item) {
        if (!item && vm.list && vm.list.length > 0) {
            vm.comments = vm.comments.concat(vm.list);
            return;
        }
        let res = await comment.getList({id: vm.id, module: vm.module, replyTarget: item ? item._id : null});

        let comments = res.body.map((c, index) => {
            c.showComment = false;
            c.replies = [];
            c.showReply = false;
            return c;
        });
        if (item) {
            item.replies = comments;
        } else {
            vm.comments = comments;
        }
    }

    export default {
        props: {
            module: {
                type: String,
                require: true
            },
            id: {
                type: Number,
                require: true
            },
            list: {
                type: Array
            }

        },
        data() {
            return {
                comments: [],
                platform: utils.platform
            }
        },
        methods: {
            toggleReply: function (comment) {
                comment.showReply = !comment.showReply;
                if (comment.showReply)
                    if (!comment.replies || comment.replies.length == 0) {//还没获得replies，请求获得replies
                        getList(this, comment);
                    }
            }
        },
        mounted: function () {
            let vm = this;
            getList(vm);
            bus.$on("comment-list:update", () => {
                getList(vm);
            });
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .comment-list {

        .item {
            margin: 5px 0;
            border-bottom: 1px solid lightsteelblue;
            padding-left: 10px;

            h4 {

                time {
                    font-size: 13px;
                    margin-left: 10px;
                }

            }

            p {
                color: #888;
                margin-left: 10px;
            }

            .operation {
                color: gray;

                i {
                    margin-left: 10px;
                    font-size: 12px;
                    cursor: pointer;
                }

                a {
                    font-size: 13px;
                    text-decoration: underline;
                    color: #365899;
                }

            }

            .comment-list {

                .item {
                    border-top: 1px solid lightsteelblue;
                    border-bottom: 0;
                }

            }
        }
    }
</style>