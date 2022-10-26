<template>
  <div
    class="container vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="row">
      <div class="col-12 max-vh-50">
        <div id="svgContainer" ref="svgContainer"></div>
      </div>
      <div class="col">
        <router-link class="btn btn-primary" to="/">回首頁</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const anLottie = this.lottie.loadAnimation({
      container: this.$refs.svgContainer,
      animType: 'svg',
      loop: true,
      path: 'https://assets9.lottiefiles.com/packages/lf20_ueovf9mk.json'
    })
    anLottie.setSpeed(1)
  }
}
</script>
