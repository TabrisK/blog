<template>
  <div class="loading-bg">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~scss/variables.scss";

$LEFT-left: -100px;

$LEFT-TOP-left: -70.71px;
$LEFT-TOP-top: -70.71px;

$TOP-top: -100px;

$RIGHT-TOP-left: 70.71px;
$RIGHT-TOP-top: -70.71px;

$delay-delta: 0.5s;

.loading-bg {
  position: relative;
  width: 100%;
  height: 300px;
  text-align: left;
  span {
    position: absolute;
    margin-top: 150px;
    margin-left: 50%;
    display: inline-block;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
      left: $LEFT-left;
      animation: 2s ease-in-out infinite alternate slide-left;
      background-color: rgb(152, 250, 24);
    }
    &:nth-child(2) {
      left: $LEFT-TOP-left;
      top: $LEFT-TOP-top;
      animation: 2s ease-in-out $delay-delta infinite alternate slide-left-top;
      background-color: rgb(170, 255, 59);
    }
    &:nth-child(3) {
      top: $TOP-top;
      animation: 2s ease-in-out $delay-delta * 2 infinite alternate slide-top;
      background-color: rgb(51, 221, 122);
    }
    &:nth-child(4) {
      left: $RIGHT-TOP-left;
      top: $RIGHT-TOP-top;
      animation: 2s ease-in-out $delay-delta * 3 infinite alternate
        slide-right-top;
      background-color: rgb(40, 202, 148);
    }
  }
}

@keyframes slide-left {
  from {
    left: $LEFT-left;
  }
  to {
    left: -$LEFT-left;
  }
}

@keyframes slide-left-top {
  from {
    left: $LEFT-TOP-left;
    top: $LEFT-TOP-top;
  }
  to {
    left: -$LEFT-TOP-left;
    top: -$LEFT-TOP-top;
  }
}

@keyframes slide-top {
  from {
    top: $TOP-top;
  }
  to {
    top: -$TOP-top;
  }
}

@keyframes slide-right-top {
  from {
    left: $RIGHT-TOP-left;
    top: $RIGHT-TOP-top;
  }
  to {
    left: -$RIGHT-TOP-left;
    top: -$RIGHT-TOP-top;
  }
}
</style>