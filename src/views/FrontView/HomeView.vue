<template>
  <div class="frontCarouse scale-up-ver-top">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          class="carousel-item overflow-hidden active bg-primary"
          data-bs-interval="6000"
        >
          <video autoplay muted loop preload="metadata">
            <source
              type="video/mp4"
              src="https://joy.videvo.net/videvo_files/video/free/2020-03/large_watermarked/200312_pl_01_4k_020_preview.mp4"
            />
          </video>
          <div
            class="carousel-caption h-100 d-flex flex-column justify-content-center align-items-center"
          >
            <h5 class="display-2 d-none d-lg-block mb-3">
              新鮮烘培·當天現烘·手沖風味
            </h5>
            <h5 class="d-lg-none d-block">新鮮烘培·當天現烘·手沖風味</h5>
            <p class="fs-3 d-none d-lg-block">
              預約外送服務提供 / 科技烘培 / 品質絕對
            </p>
            <p class="fs-7 d-lg-none d-block">
              預約外送服務提供 / 科技烘培 / 品質絕對
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <img
            src="~@/assets/images/carousel-01.jpg"
            class="d-block"
            alt="..."
          />
          <div class="carousel-caption">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <img
            src="~@/assets/images/carousel-02.jpg"
            class="d-block"
            alt="..."
          />
          <div class="carousel-caption">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <img
            src="~@/assets/images/carousel-03.jpg"
            class="d-block"
            alt="..."
          />
          <div class="carousel-caption">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  mounted() {
    this.$store.dispatch('handLoading', false)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.frontCarouse {
  height: 70vh;
  @include pad() {
    height: 45vh;
  }
}
video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
