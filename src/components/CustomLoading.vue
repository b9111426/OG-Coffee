<template>
  <loading :active="isLoading" :z-index="2000">
    <div class="loadingio-spinner-wedges-rkqu80odf0m">
      <div class="ldio-1p09ol9yjzs">
        <div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    </div>
  </loading>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    }
  }
}
</script>

<style lang="scss">
@keyframes ldio-1p09ol9yjzs {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ldio-1p09ol9yjzs > div > div {
  transform-origin: 100px 100px;
  animation: ldio-1p09ol9yjzs 3s linear infinite;
  opacity: 0.8;
}
.ldio-1p09ol9yjzs > div > div > div {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 70px;
  height: 70px;
  border-radius: 70px 0 0 0;
  transform-origin: 100px 100px;
}
.ldio-1p09ol9yjzs > div div:nth-child(1) {
  animation-duration: 0.75s;
}
.ldio-1p09ol9yjzs > div div:nth-child(1) > div {
  background: #da6a38;
  transform: rotate(0deg);
}
.ldio-1p09ol9yjzs > div div:nth-child(2) {
  animation-duration: 1s;
}
.ldio-1p09ol9yjzs > div div:nth-child(2) > div {
  background: #f08437;
  transform: rotate(0deg);
}
.ldio-1p09ol9yjzs > div div:nth-child(3) {
  animation-duration: 1.5s;
}
.ldio-1p09ol9yjzs > div div:nth-child(3) > div {
  background: #f49c2d;
  transform: rotate(0deg);
}
.ldio-1p09ol9yjzs > div div:nth-child(4) {
  animation-duration: 3s;
}
.ldio-1p09ol9yjzs > div div:nth-child(4) > div {
  background: #faca7b;
  transform: rotate(0deg);
}
.loadingio-spinner-wedges-rkqu80odf0m {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
}
.ldio-1p09ol9yjzs {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-1p09ol9yjzs div {
  box-sizing: content-box;
}
</style>
