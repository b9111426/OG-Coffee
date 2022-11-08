<template>
  <div class="contain-fluid pb-5">
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
              <img v-src="item?.imageUrl[0]" class="card-img-top" alt="..." />
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
      <template v-if="isShow">
        <div v-if="products.length === 0">
          <p class="fs-3 text-primary mt-5">
            找不到您所查詢的「{{ notFound }}」相關商品
          </p>
        </div>
      </template>
    </div>
    <!-- 分頁 -->
    <Pagination
      class="mt-4"
      :pages="pagination"
      @emit-pages="getProducts"
      @searchPages="handSearchPages"
    ></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import _ from 'lodash'

export default {
  components: { Pagination },
  data() {
    return {
      isShow: false
    }
  },
  updated() {
    this.isShow = true
  },
  methods: {
    toNewRouter(id, sellout) {
      if (sellout) {
        return
      }
      this.$store.dispatch('Products/setLoading', true)
      this.$store.dispatch('Products/setSortState', false)
      this.$router.push({ path: `products/${id}` })
    },
    async getProducts(page = 1, category) {
      try {
        const data = { page, category }
        await this.$store.dispatch('Products/getFrontProducts', data)
      } catch (err) {
        throw new Error(err)
      }
    },
    handSearchPages(page) {
      this.$store.dispatch('Products/setSearchPagination', page)
    },
    addToCart: _.debounce(async function (e) {
      const id = e.target.dataset.id
      const data = {
        product_id: id,
        qty: 1
      }
      try {
        const res = await this.$store.dispatch('Cart/addCart', data)
        const title = res.data.data.product.title
        this.$store.dispatch('fireToast', {
          title: `「${title}」已加入購物車`,
          style: 'success'
        })
        this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('Cart/setShake')
      } catch (err) {
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
    },
    notFound() {
      return this.$store.getters['Products/notFound']
    }
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
.btn-size {
  height: 35px;
}
</style>
