<template>
  <header class="header-bar">
    <div class="bg">
      <router-link :to="{ name: 'articles'}">
        <img src="@app/assets/img/portrait.png" />
      </router-link>
      <!--<div class="header-bar">
                <span class="topic">HELEX的造作 - {{$route.meta.str}}</span>
                <span class="right"></span>
      </div>-->

      <span class="right">
        <i
          class="fa fa-bars fa-3 nav-right-panel"
          aria-hidden="true"
          @click="showRightPanel = !showRightPanel;"
          :style="{color: showRightPanel?'#009245':'white'}"
        ></i>
      </span>
    </div>
    <!--<nav class="nav-bar">
            <section>
                <router-link :class="{ active: isActive('b')}" :to="{ name: 'brief'}">精选</router-link>
                <router-link :class="{ active: isActive('a')}" :to="{ name: 'articles'}">文章</router-link>
                <router-link :class="{ active: isActive('p')}" :to="{ name: 'photo'}">摄影</router-link>
                <router-link :class="{ active: isActive('m')}" :to="{ name: 'me'}">关于</router-link>
            </section>
    </nav>-->
    <right-panel :show="showRightPanel" @toggle="showRightPanel = !showRightPanel;"></right-panel>
  </header>
</template>
<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      showRightPanel: false
    };
  },
  methods: {
    isActive(path) {
      return new RegExp("^/" + path).test(this.$route.path);
    }
  },
  computed: {},
  mounted: function() {}
};
</script>
<style lang="scss" type="text/scss">
@import "~scss/variables.scss";

header.header-bar {
  width: 100%;
  z-index: $layout-A;
  margin-bottom: 25px;
  .bg {
    padding-bottom: 0px;
    background-color: #363636;
    img {
      width: 160px;
    }
    .right {
      display: none;
    }
  }
}

//device width <= iphone6 plus
@media (max-width: 414px) {
  header.header-bar {
    margin-bottom: 0px;
    .bg {
      .right {
        display: inline-block;
        float: right;
        margin-right: 10px;

        .nav-right-panel {
          color: white;
          font-size: 32px;
          line-height: 64px;
        }
      }
    }
  }
}
</style>