<template>
    <div class="vehicle-detail">
        <table class="table">
            <tbody>
            <tr>
                <td>ID：{{$route.params.id}}</td>
                <td>位置：</td>
            </tr>
            <tr>
                <td>状态：</td>
                <td>更新时间：</td>
            </tr>
            </tbody>
        </table>
        <baidu-map :init="mapInit" class="vehicle-detail-map"></baidu-map>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                mapInit: function (map) {
                    map.centerAndZoom(new BMap.Point(121.48, 31.22), 13);
                }
            }
        },
        mounted: function () {
        },
        updated: function () {
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .vehicle-detail {
        bottom: 0px;
        table {
            width: 100%;
            td {
                width: 50%;
            }
        }
        .vehicle-detail-map {
            top: 50px;
            bottom: 0px;
            height: auto;
        }
    }
</style>