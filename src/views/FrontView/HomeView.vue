<template>
  <div class="container-fulid mb-5">
    <div class="frontCarouse bg-primary">
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
        <div class="carousel-inner text-center">
          <div
            class="carousel-item overflow-hidden active bg-primary"
            data-bs-interval="6000"
          >
            <video preload="auto" autoplay muted playsinline>
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
              class="h-100"
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894185405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CY5I7%2F9Zq55J9%2BPuJD5Nq3wgTei%2BZC%2FIq8dHiK9DvATEx9239jSIdlHiuoRRLs6m%2FOLrKOBZ86hzpydAaosRcwx3FzPZ%2B3MRYrHVgGXGpJDaYFaz80Cs1s6HrH9pFm0ZtVirQuTkTEZVuY%2BCNyBncVizRaPx8iMOfZTLy724MHFLM00UQmD6AQIeCgIvDnaSQIz7KzSt8YZsHC%2By9FipmLG6MVUk5uhfWALIdGbIgRsOdoDdIfLhlr6P3yuaJpAf89psTstE9oJZnFRK4vwZ7EEEFPzDXgb8vRFLM6cIbxORk54PxvZOpNLwO6UiykbizcF12%2BUqiCpzyqpfcJwfAg%3D%3D'
              "
              alt="..."
            />
            <div
              class="carousel-caption h-100 d-flex flex-column justify-content-center"
            >
              <h2 class="text-dark d-none d-lg-block me-auto">
                環保外帶紙杯，100%防水植纖紙漿
              </h2>
              <h6 class="d-lg-none d-block">環保外帶紙杯，100%防水植纖紙漿</h6>
              <p class="d-lg-none d-block fs-6">一次性飲料杯你有更好的選擇</p>
              <p class="text-dark fs-4 d-none d-lg-block me-auto">
                一次性飲料杯你有更好的選擇
              </p>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img
              class="h-100"
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894372645.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IRGffsFnN6Ge4vWO5WkrhSvf84U1b4HbYvA6fjeDR%2BZ57tDwDyhPtx4AfGzsoNg2j0Mw3%2FRkyU%2FBfVg%2BccNn8GKQsh5nyduL%2B8dNA4aGSpWO42%2BcEn2DpqT%2F04BV7RR6Zp90sKQ2TpWzlx58%2FYPVyfQxzCo9ORPy57L%2BkCu1dRPcblDssVB9tWJ%2F%2F0JSZwYO6TBDwO%2FbiuTnJXS%2F%2BzJNtHPKabtMtMB%2FY6RQr9kdCkx73PvgLaWnC1CnRK%2Fo0w0fMOtQ%2FIl284UR2fPK6FyrtrfMuumpGJHu%2BdrtZjjp0PCoE%2FqRZKoqf5QAdC0AcJWrO885kS6ATpVcEB5cg9Y7iw%3D%3D'
              "
              alt="..."
            />
            <div
              class="carousel-caption h-100 d-flex flex-column justify-content-end"
            >
              <h2 class="text-start">熱銷阿里山莊園咖啡豆</h2>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img
              class="h-100"
              v-src="
                'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1667894426825.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HkK%2BoW0K%2BnW%2FEZ9wcSao%2FLd2WFIDzAR6LWtpWmgUSJAsmI%2BPRKB5ng2jfwXRJPgTLyZq%2Bl%2BOkCuV05FhYoRwI7YA1DDbKibSVnTLXnFjEz2ALharcrRgfuQZR70ussHdD7dgAG9cUYl%2BDTfi2A56iuaeol6sRufsijU6anSx106W%2FyHETp42uOolZ55q8uYac0WGXJdqsqfuBsu2wdteEEx%2Bf9ic5lKU4ZorDQUTpdjIXdAbIca6AH326g0FziOinHxYtq4QcRHEHXNRHWKqY89W5mkI%2BXGKAYIvXV92QDLH0VJrNE6uva%2B9hDapaZ1IB1qSMGxIxAX%2F5qZiJUp6gQ%3D%3D'
              "
              alt="..."
            />
            <div class="carousel-caption">
              <h1>專業咖啡課程</h1>
              <p class="fs-3">場地租借/親子烘培體驗/進階專業課程</p>
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

  <div class="container">
    <div class="row row-cols-lg-3 row-cols-1 gx-4 py-3 mb-5">
      <div class="col mb-3 mb-lg-0">
        <div class="box bg-light h-100 py-3 shadow-sm">
          <img
            class="w-100 px-2"
            v-src="
              'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1668173632062.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Rri259DKpvGrOcVlMycBqQEYyewiiZN8wFhY48Efvh02IB%2BYXEyFBnAe9fiz1xhYvmisiOVhrPIjCUYH1ukyrgOyFea2cwufm0%2BBJhSfVuAHRnJiowblYH1AuqwReECXMqU0qYAJtiTbRg8Lq%2FQ%2Fo3URXHOPTraLAPJn3BFbEORBqVlvhWvZuV8YWFkV86PWCJCicvEOvZFwFPQUtvWhovT%2BDlOP15BxbWZQDLeGz%2BBuK6kVdk6TBIkqvRn62SCYzL8Ez4DpNZ43VGH6NDUhcqcqEY1QzpKoIi95%2FpWkzNkCLzlIfuB1WdSVGQR9E8VjkKWGWiEpYHi0Nncaaa3MVA%3D%3D'
            "
            alt=""
          />
          <h5 class="text-tertiary py-3">預約外送</h5>
          <p class="px-4 text-start">2個小時前至7天內線上預約，訂餐超方便</p>
        </div>
      </div>
      <div class="col mb-3 mb-lg-0">
        <div class="box bg-light h-100 py-3 shadow-sm">
          <img
            class="w-100 px-2"
            v-src="
              'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1668176921317.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jVi7nXjvYgSjUAaui5OjQawFOHvcNqMhV9kXe4Kn%2FF8VFrOM0fMxz4%2FKy%2Fg860%2BR468OLsT64wuC%2BTs%2BYt681shvwUXoCO0cuyxv4GvZl2tM6VMr%2BErafNOx6xdMQvYpbut45zUUBcx9nwYbNuaobdBohYwMxW2QMw%2FqdFZALXJIFM1YGvVqvgd%2FUbftl79t5fNKVX2602r5%2B8vbsfW4gNQV1gBpraxNEmOHtrdJLR1AMjeN9i5v4RSIDsMmzovQ2PPthW9VQera%2FXE%2BaZoX03k1KVYQv7TekJA1kJoGC5dUslRL3BUnEpBK%2BGljUJeYqnYi7r1iliFug3OmjlK%2BwQ%3D%3D'
            "
            alt=""
          />
          <h5 class="text-tertiary py-3">輕鬆享用的價格帶</h5>
          <p class="px-4 text-start">
            OG-Coffee在維持咖啡品質的同時，也默默定位在就算搭配甜點也能輕鬆享用的價格帶。
          </p>
        </div>
      </div>
      <div class="col">
        <div class="box bg-light h-100 py-3 shadow-sm">
          <img
            class="w-100 px-2"
            v-src="
              'https://storage.googleapis.com/vue-course-api.appspot.com/sausage/1668178074359.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=V3niDL6R7hzlWfn3RvthPZCniVZgDyVXyRvcopxu7TE2NUXRrt0oosnnZZ%2Fnbo1UDc5NTKhccOmHz1pBJaKtHBFVzv03su9tQ8SEMRb41wb8ZQ9W9AKKMxnX7%2BVxa81x1tlo8d%2FBCCx3oAkt8nUZl2H1RXGpBXkJarccKRz38EP5XFYXOSU2Vsxgd8OvxHQ3y1a2LZqlWRDZ5SaaMczU5mKDztag10ZIcbnbvQUlmBaWLyh3CSL6f2Y2X4KkM82JhCbfhOvVioTyMQfdjiARXTkqmMOw2G8noaEBX8wMf2jUCXnfu3ZBelXe4ExLkbZEYpmwmXHUl1RBy%2FxGgq5X3g%3D%3D'
            "
            alt=""
          />
          <h5 class="text-tertiary py-3">在地產區</h5>
          <p class="px-4 text-start">
            深入阿里山、屏東、台東、花蓮等咖啡產區，挖掘出台灣咖啡的特色與魅力。
          </p>
        </div>
      </div>
    </div>

    <div class="row row-cols-lg-2 row-cols-1 mb-5">
      <div class="col mb-3 mb-lg-0">
        <img
          class="ab-pic img-fluid img-thumbnail w-100"
          v-src="
            'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          "
          alt=""
        />
      </div>
      <div class="col d-flex flex-column justify-content-center">
        <h3>關於橘子咖啡</h3>
        <p class="mb-4 h5">about OG-Coffee</p>
        <p class="text-start">
          每個夢想都始於一杯新鮮的咖啡。 在 about
          OG-Coffee，我們的夢想是在最舒適的空間中創造出最好的咖啡。
          我們想邀請大家過來與我們分享他們的夢想
        </p>
      </div>
    </div>

    <section class="mb-5">
      <h4 class="h4 text-primary">熱銷商品</h4>
      <ProductsSection @open-modal="openModal"></ProductsSection>
    </section>
  </div>
  <ProductModal ref="productModal"></ProductModal>
</template>

<script>
import ProductsSection from '@/components/ProductsSection.vue'
import ProductModal from '@/components/ProductModal.vue'
export default {
  inject: ['emitter'],
  components: { ProductsSection, ProductModal },
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  methods: {
    openModal(id) {
      const modalComponent = this.$refs.productModal
      modalComponent.openModal()
      modalComponent.getProduct(id)
    }
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
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  object-position: center;
}

.box img {
  object-fit: cover;
  object-position: center;
  height: 250px;
}

.ab-pic {
  min-height: 300px;
}
</style>
