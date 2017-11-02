<template>
    <section class="right-panel">
        <transition name="fade">
            <div v-show="show" class="right-panel-bg" @click="$emit('toggle');"></div>
        </transition>
        <transition name="slide-left">
            <div v-show="show" class="main">
                <i class="fa fa-times right-panel-close" @click="$emit('toggle');"></i>
                <profile style="margin-top: 25px;"></profile>
                <hot></hot>
                <latest></latest>
            </div>
        </transition>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            show: {
                type: Boolean,
                require: true
            }
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        mounted: function () {
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .right-panel {
        .right-panel-bg {
            width: 100%;
            position: fixed;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 8;
        }
        .main {
            width: 75%;
            background-color: white;
            position: fixed;
            top:0;
            right: 0;
            bottom:0;
            overflow: auto;
            z-index: 9;

            .right-panel-close {
                font-size: 20px;
                margin: 4px;
            }
        }
    }
</style>