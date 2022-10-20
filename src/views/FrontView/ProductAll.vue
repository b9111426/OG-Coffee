<template>
  <div class="contain-fluid">
    <div class="row">
      <div class="col-lg-3 col-6" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <a class="card-link position-relative" @click="toNewRouter(item.id)">
            <img :src="item.imageUrl" class="card-pic card-img-top" alt="..." />
            <p
              class="position-absolute text-white top-50 start-50 translate-middle"
            >
              加入購物車
            </p>
          </a>
          <div class="card-body">
            <p class="text-start">{{ item.title }}</p>
            <p class="text-start">{{ item.subtitle }}</p>
            <p class="d-flex justify-content-between">
              <span class="text-danger text-decoration-line-through"
                >NT{{ item.origin_price }}</span
              >
              <span class="fw-bold">NT{{ item.price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async getProducts(page = 1) {
      try {
        await this.$store.dispatch('Products/getFrontProducts', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    toNewRouter(id) {
      this.$router.push({ path: `products/${id}` })
    }
  },
  mounted() {
    this.getProducts()
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    }
  }
}
</script>

<style lang="scss" scoped>
.card-link {
  cursor: pointer;
}
.card-link > p {
  opacity: 0;
  text-shadow: 0 0 5px #000;
  transition: all 0.2s ease-in-out;
}

.card-link:hover > p {
  opacity: 100%;
}
</style>
