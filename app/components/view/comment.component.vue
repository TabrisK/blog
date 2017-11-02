<template>
    <div class="comment">
        <form id="comment" v-form="commentForm">
            <div class="input-group">
                <input name="name" v-model="newComment.name" placeholder="输入昵称（12字以内）" maxlength="12" required>
            </div>
            <div class="input-group">
                <textarea name="content" v-model="newComment.content" placeholder="输入评论（500字以内）" maxlength="500"
                          required></textarea>
            </div>
            <div class="input-group">
                <slide-vc @vc="e=>{newComment.vc = e}"></slide-vc>
            </div>
            <div class="input-group">
                <button type="button" @click="sendComment(newComment)">发表</button>
            </div>
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import bus from "../../bus";
    import _ from "lodash";
    import {comment} from "../../local_modules/blog-api";

    async function getList() {
        bus.$emit("comment-list:update");
    }

    function getDefaultInfo(vm) {
        return {
            vc: {},
            name: "",
            content: "",
            module: vm.module,//所属模块
            target: Number(vm.id),//所属文章
            replyTarget: vm.replyTarget//回复对象
        };
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
            replyTarget: {
                type: String
            }
        },
        data() {
            return {
                commentForm: {},
                newComment: getDefaultInfo(this),
                comments: []
            }
        },
        methods: {
            async sendComment() {
                if (!this.newComment.name) {
                    bus.$emit("errorMessage", "请输入昵称");
                } else if (!this.newComment.content) {
                    bus.$emit("errorMessage", "请输入评论");
                } else if (_.size(this.newComment.vc) == 0) {
                    bus.$emit("errorMessage", "请完成验证码");
                } else {//通过
                    this.newComment.updateTime = Date.now();
                    let res = await comment.set(this.newComment);
                    getList();
                    bus.$emit("comment:reset");
                }

            }
        },
        mounted: function () {
            bus.$on("comment:reset", () => {
                this.newComment = getDefaultInfo(this);
            });
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .comment {

        #comment {
            background-color: #eeeeee;
            padding: 5px;
            border-radius: 5px;

            .input-group {
                margin-top: 10px;

                &:first-child {
                    margin-top: 0;
                }

                textarea {
                    vertical-align: text-top;
                    width: -webkit-fill-available;
                    line-height: 15px;
                    font-size: 15px;
                    resize: none;
                }

                input {
                    font-size: 15px;
                    width: 200px;

                    &[name=vc] {
                        width: 150px;
                    }

                }

                .vc {
                    width: 50px;
                    height: 100%;
                }

            }

            button {

                &.disabled {
                    background-color: lightgray;
                }

            }
        }
    }
</style>