<template>
    <div>
        <ul class="primary-list">
            <li v-for="item in list">
                <!--<router-link :to="{ name: 'detail', params: { id: vehicle.id }}">-->
                    <!--<b>{{vehicle.plate}}</b>-->
                    <!--<span class="contact">{{vehicle.contact}}</span>-->
                <!--</router-link>-->
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data (){
            return {
                list: [
                    "webgl教程",
                    "河西走廊民风一览"
                ]
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
        },
        methods: {
        }
    }
</script>