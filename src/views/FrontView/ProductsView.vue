<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-12 bg-danger py-2"></div>
      <div class="col-lg-9 col-12 py-2">
        <div class="row row-cols-1 mb-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">全部商品</a>
              </li>
              <li class="breadcrumb-item">
                <a href="#">全部商品</a>
              </li>
            </ol>
          </nav>
        </div>
        <div class="row row-cols-2 row-cols-lg-4">
          <div class="col" v-for="item in products" :key="item.id">
            <div class="card h-100">
              <router-link
                :to="`/product/${item.id}`"
                class="card-link position-relative"
              >
                <img
                  :src="item.imageUrl"
                  class="card-pic card-img-top"
                  alt="..."
                />
                <p
                  class="position-absolute text-white top-50 start-50 translate-middle"
                >
                  產品細項
                </p>
              </router-link>
              <div class="card-body">
                <p class="text-start">{{ item.title }}</p>
                <p class="d-flex justify-content-between">
                  <span class="text-danger text-decoration-line-through"
                    >NT{{ item.origin_price }}</span
                  >
                  <span class="fw-bold">NT{{ item.price }}</span>
                </p>
                <div class="input-group input-group-sm flex-nowrap mt-2">
                  <button class="btn btn-gray" type="button" id="button-addon1">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <input
                    type="text"
                    value="1"
                    class="form-control text-center"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button class="btn btn-gray" type="button" id="button-addon1">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
                <button type="button" class="btn btn-primary btn-sm mt-2">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async getProducts(page = 1) {
      try {
        await this.$store.dispatch('Products/getFrontProducts', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    }
  },
  mounted() {
    this.getProducts()
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    }
  }
}
</script>

<style lang="scss">
.card-link > p {
  opacity: 0;
  text-shadow: 0 0 5px #000;
  transition: all 0.3s ease-in-out;
}

.card-link:hover > p {
  opacity: 100%;
}
</style>
