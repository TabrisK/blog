<template>
    <div class="mapBg"><div id="container"></div></div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            init: {
                type: Function,
                require: true
            }
        },
        data(){
            return {
                map: null
            }
        },
        mounted: function(){
            this.map = new BMap.Map("container");    // 创建地图实例
            this.init(this.map);
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