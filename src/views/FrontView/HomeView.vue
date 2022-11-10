<template>
  <div class="container-fulid">
    <div class="frontCarouse mb-5 bg-primary">
      <div
        id="carouselExampleCaptions"
        class="carousel slide h-100"
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
            class="carousel-item overflow-hidden active bg-primary w-100"
            data-bs-interval="6000"
          >
            <video
              autoplay
              muted
              loop
              preload="metadata"
              playsinline
              class="w-100 h-100"
            >
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
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894185405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CY5I7%2F9Zq55J9%2BPuJD5Nq3wgTei%2BZC%2FIq8dHiK9DvATEx9239jSIdlHiuoRRLs6m%2FOLrKOBZ86hzpydAaosRcwx3FzPZ%2B3MRYrHVgGXGpJDaYFaz80Cs1s6HrH9pFm0ZtVirQuTkTEZVuY%2BCNyBncVizRaPx8iMOfZTLy724MHFLM00UQmD6AQIeCgIvDnaSQIz7KzSt8YZsHC%2By9FipmLG6MVUk5uhfWALIdGbIgRsOdoDdIfLhlr6P3yuaJpAf89psTstE9oJZnFRK4vwZ7EEEFPzDXgb8vRFLM6cIbxORk54PxvZOpNLwO6UiykbizcF12%2BUqiCpzyqpfcJwfAg%3D%3D'
              "
              alt="..."
            />
            <div class="carousel-caption">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894372645.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IRGffsFnN6Ge4vWO5WkrhSvf84U1b4HbYvA6fjeDR%2BZ57tDwDyhPtx4AfGzsoNg2j0Mw3%2FRkyU%2FBfVg%2BccNn8GKQsh5nyduL%2B8dNA4aGSpWO42%2BcEn2DpqT%2F04BV7RR6Zp90sKQ2TpWzlx58%2FYPVyfQxzCo9ORPy57L%2BkCu1dRPcblDssVB9tWJ%2F%2F0JSZwYO6TBDwO%2FbiuTnJXS%2F%2BzJNtHPKabtMtMB%2FY6RQr9kdCkx73PvgLaWnC1CnRK%2Fo0w0fMOtQ%2FIl284UR2fPK6FyrtrfMuumpGJHu%2BdrtZjjp0PCoE%2FqRZKoqf5QAdC0AcJWrO885kS6ATpVcEB5cg9Y7iw%3D%3D'
              "
              alt="..."
            />
            <div class="carousel-caption">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894426825.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HkK%2BoW0K%2BnW%2FEZ9wcSao%2FLd2WFIDzAR6LWtpWmgUSJAsmI%2BPRKB5ng2jfwXRJPgTLyZq%2Bl%2BOkCuV05FhYoRwI7YA1DDbKibSVnTLXnFjEz2ALharcrRgfuQZR70ussHdD7dgAG9cUYl%2BDTfi2A56iuaeol6sRufsijU6anSx106W%2FyHETp42uOolZ55q8uYac0WGXJdqsqfuBsu2wdteEEx%2Bf9ic5lKU4ZorDQUTpdjIXdAbIca6AH326g0FziOinHxYtq4QcRHEHXNRHWKqY89W5mkI%2BXGKAYIvXV92QDLH0VJrNE6uva%2B9hDapaZ1IB1qSMGxIxAX%2F5qZiJUp6gQ%3D%3D'
              "
              alt="..."
            />
            <div class="carousel-caption">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
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
  object-fit: cover;
  object-position: center;
}
</style>
