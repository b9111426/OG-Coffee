<template>
  <div class="contain-fluid">
    <div class="row">
      <div class="col-lg-3 col-6 g-3" v-for="item in products" :key="item.id">
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
              <img :src="item?.imageUrl[0]" class="card-img-top" alt="..." />
            </div>
            <p
              v-if="!item.is_soldOut"
              class="position-absolute text-white top-50 start-50 translate-middle"
            >
              加入購物車
            </p>
          </a>
          <div class="card-body">
            <p class="text-start">{{ item.title }}</p>
            <p class="text-start">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁 -->
    <Pagination
      class="mt-3"
      :pages="pagination"
      @emit-pages="getProducts"
    ></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  components: { Pagination },
  methods: {
    toNewRouter(id, sellout) {
      if (sellout) {
        return
      }
      this.$store.dispatch('Products/setLoading', true)
      this.$router.push({ path: `products/${id}` })
    },
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
    this.$store.dispatch('Products/setBreadcrumb', '')
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    },
    pagination() {
      return this.$store.getters['Products/productsPage']
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.card-link {
  cursor: pointer;
}
.card-pic {
  object-fit: cover;
  object-position: center;
}
.card-link > p {
  opacity: 0;
  text-shadow: 0 0 5px #000;
  transition: all 0.2s ease-in-out;
}

.card-link:hover > p {
  opacity: 100%;
}
.sellOutTag {
  width: 100%;
  height: 40px;

  &::after {
    content: '售完';
    color: #fff;
    font-size: 1.5rem;
    letter-spacing: 0.8rem;
  }
}
</style>
