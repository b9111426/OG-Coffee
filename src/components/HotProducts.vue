<template>
  <div>這是熱銷商品</div>

  <div class="row">
    <div
      class="col-lg-3 col-md-4 col-6 g-3"
      v-for="item in products"
      :key="item.id"
    >
      <div class="card h-100">
        <a
          class="position-relative"
          :class="{ 'card-link': !item.is_soldOut }"
          @click="toNewRouter(item.id, item.is_soldOut)"
        >
          <div
            class="card-pic position-relative d-inline-block overflow-hidden"
          >
            <div
              v-if="item.is_soldOut"
              class="position-absolute sellOutTag bg-danger start-50 top-50 translate-middle"
            ></div>
            <img v-src="[item.imageUrl]" class="card-img-top" alt="..." />
          </div>
          <p
            v-if="!item.is_soldOut"
            class="position-absolute text-white text-nowrap top-50 start-50 translate-middle"
          >
            加入購物車
          </p>
        </a>
        <div class="card-body d-flex flex-column p-1 p-lg-3">
          <p class="text-center fs-5">{{ item.title }}</p>
          <p class="text-center fs-7 fs-lg-5 lh-mm mb-3">
            {{ item.subtitle }}
          </p>

          <button
            type="button"
            class="btn btn-sm btn-outline-primary py-0 d-block d-lg-none mt-auto"
            :data-id="item.id"
            @click="addToCart($event)"
          >
            <i class="bi bi-cart-fill fs-5"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 分頁 -->
  <Pagination
    class="mt-4"
    :pages="pagination"
    @emit-pages="getProducts"
  ></Pagination>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import _ from 'lodash'

export default {
  components: { Pagination },
  data() {
    return {}
  },
  created() {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getFrontAllProduct')
        this.getProducts(1, '飲品')
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    getProducts: _.debounce(async function (page = 1, category) {
      try {
        this.isLoading2 = true
        const data = { page, category }
        await this.$store.dispatch('Products/getFrontProducts', data)
        this.$store.dispatch('Products/setTempProduct', category)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    }, 500)
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    },
    pagination() {
      return this.$store.getters['Products/productsPage']
    }
  }
}
</script>

<style></style>
