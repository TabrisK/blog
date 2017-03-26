<template>
    <div>
        <ul class="primary-list">
            <li v-for="vehicle in vehicleList">
                <router-link :to="{ name: 'detail', params: { id: vehicle.id }}">
                    <b>{{vehicle.plate}}</b>
                    <span class="contact">{{vehicle.contact}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data (){
            return {
                loading: true,
                error: null,
                vehicleList: null
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.getVehicles()
        },
        methods: {
            getVehicles () {
                this.error = this.vehicleList = null;
                this.loading = true;
                this.$http.get("/api/vehicles").then(res=> {
                    this.vehicleList = res.body;
                }, (err)=> {
                    console.log(err)
                });
            }
        }
    }
</script>