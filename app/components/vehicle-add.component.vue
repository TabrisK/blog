<template>
    <div>
        <form @submit.prevent="addVehicle(vehicle)" v-form="addVForm">
            <input name="plate" v-model="vehicle.plate" placeholder="车牌"
                   pattern="^[\u4e00-\u9fa5]{1}[A-Z0-9]*$" maxlength="7" required
                   :class="{'error': addVForm.plate?addVForm.plate.$dirty && addVForm.plate.$invalid:false}">
            <input name="brand" v-model="vehicle.brand" placeholder="品牌"
                   :class="{'error': addVForm.brand?addVForm.brand.$dirty && addVForm.brand.$invalid:false}">
            <input name="contact" v-model="vehicle.contact" placeholder="联系人" required
                   :class="{'error': addVForm.contact?addVForm.contact.$dirty && addVForm.contact.$invalid:false}">
            <input name="phone" v-model.number="vehicle.phone" type="number" placeholder="联系方式" required
                   :class="{'error': addVForm.phone?addVForm.phone.$dirty && addVForm.phone.$invalid:false}">
            <select name="device" required
                    :class="{'error': addVForm.device?addVForm.device.$dirty && addVForm.device.$invalid:false}">
                <option disabled>选择设备类型</option>
                <option value="1">内部设备</option>
                <option value="2">外部设备</option>
            </select>
            <button :disabled="addVForm.$invalid" type="submit"
                    :class="{'disabled': addVForm.$invalid}"
            >提交
            </button>
            {{addVForm}}
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
    "use strict";
    export default {
        data (){
            return {
                vehicle: {},
                addVForm: {}
            }
        },
        created () {
        },
        methods: {
            addVehicle(v){
                this.$http.post("/api/vehicles", v).then(res=> {
                    if (res.status == 200)
                        this.$router.push({path: "/all-vehicles"});

                }, (err)=> {
                    console.log(err);
                });
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    form {
        input {
            border-left: 0px;
            border-right: 0px;
            width: 100%;
            line-height: 26px;
            font-size: 18px;
            padding: 0px 10px;
            margin: 10px 0px;
            box-sizing: border-box;
        }
    }

    .error {
        border: 2px solid red;
    }

    .disabled {
        color: gray;
    }
</style>