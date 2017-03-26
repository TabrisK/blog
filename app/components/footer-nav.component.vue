<template>
    <div class="footer-nav">
        <router-link :to="{ name: 'all'}" :class="{highlight: !!$route.path.match('/vehicle')}" tag="span">
            <i class="fa fa-compass fa-2x" aria-hidden="true"></i>
            <p>列表</p>
        </router-link>
        <router-link :to="{ name: 'setting'}" :class="{highlight: !!$route.path.match('/setting')}" tag="span">
            <i class="fa fa-cog fa-2x" aria-hidden="true"></i>
            <p>设置</p>
        </router-link>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        }
    }
</script>