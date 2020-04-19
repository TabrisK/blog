<template>
  <div class="skeleton-bg">
    <h3></h3>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~scss/variables.scss";

.skeleton-bg {
  h3,
  li {
    width: 100%;
    height: 16px;
    animation: 1.4s ease 0s infinite running skeleton-loading;
    background-size: 200px 100%;
    background-color: #eee;
    background-image: linear-gradient(90deg, #eee, #f5f5f5 50%, #eee);
    background-repeat: no-repeat;
  }
  h3 {
    width: 38%;
    margin-top: 16px;
  }
  ul {
    margin-top: 24px;
    list-style-type: none;
    padding-left: 0;
    li {
      margin-top: 16px;
    }
  }
}

@keyframes skeleton-loading {
  from {
    background-position: -200px 0;
  }
  to {
    background-position: calc(100% + 200px) 0;
  }
}
</style>