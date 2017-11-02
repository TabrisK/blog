<template>
    <transition name="fade">
        <p class="error-message" v-if="info.msg" :class="[msgClass[info.status]]">{{info.msg}}</p>
    </transition>
</template>
<script type="text/ecmascript-6">
    import _ from "lodash";
    import bus from "../../bus";

    export default {
        props: {},
        data(){
            return {
                info: {
                    msg: "",
                    long: 2000,
                    status: 0//0:error
                },
                msgClass: ["error"]
            }
        },
        mounted: function () {
            bus.$on("errorMessage", msg => {
                let info = {
                    msg: "",
                    long: 2000,
                    status: 0//0:error
                };
                if (_.isObject(msg)) {
                    info = Object.assign(info, msg);
                } else if (_.isString(msg)) {
                    info.msg = "提示：" + msg;
                }
                this.info = Object.assign(this.info, info);
                setTimeout(() => {
                    this.info.msg = "";
                }, info.long);
            });
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "~scss/variables.scss";

    .error-message {
        position: fixed;
        top: 0;
        width:100%;
        text-align: center;
        &.error{
            background-color: #FF3366;
            color: white;
        }
    }
</style>