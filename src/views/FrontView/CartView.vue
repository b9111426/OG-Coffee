<template>
  <div class="container">
    <h2 class="my-5">購物車</h2>
    <div class="card overflow-auto flex-nowrap mt-3 px-3">
      <table class="table mt-4 table-hover">
        <thead>
          <tr class="table-light">
            <th class="text-nowrap">商品資料</th>
            <th class="text-center text-nowrap px-5">優惠</th>
            <th width="160" class="text-center text-nowrap">單件價格</th>
            <th width="220" class="text-center">數量</th>
            <th width="160" class="text-center text-nowrap">小計</th>
            <th width="80" class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in cartData" :key="i.id" class="align-middle">
            <td class="text-start">
              <img
                class="pre-pic img-thumbnail"
                :src="i.product.imageUrl[0]"
                alt="縮圖"
              />
              <div class="d-inline-block ms-1">
                <p>{{ i.product.title }}</p>
                <p>{{ i.product.category }}</p>
              </div>
            </td>
            <td>優惠</td>
            <td class="text-center text-nowrap">
              {{ i.product.price * i.product.origin_price }}
            </td>
            <td class="text-center text-nowrap">
              {{ i.product.num }}
            </td>
            <td class="text-center text-nowrap">{{ i.final_total }}</td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(i)"
              >
                <i class="bi bi-x"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="cartData.length === 0" class="text-center">
          <td colspan="7" class="fs-3 text-gray-dark py-4">
            購物車已空

            <div id="emptyCart" ref="emptyCart"></div>
          </td>
        </tbody>
        <!--<tbody v-if="products.length === 0" class="text-center">
          <td colspan="7" class="fs-3 text-gray py-4">產品列表已空</td>
        </tbody>-->
      </table>
    </div>
    <!--<table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            ></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="item.price === item.origin_price">
              {{ item.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openProductModal(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <div
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  v-if="isLoadingItem === item.id"
                ></div>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <div
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  v-if="isLoadingItem === item.id"
                ></div>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>-->
  </div>
  <pre>{{ cartData }}</pre>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    async getCart() {
      try {
        await this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    getProducts() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
        })
    },
    addToCart(id, qty = 1) {
      this.isLoadingItem = id
      const data = {
        product_id: id,
        qty
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then(() => {
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          throw new Error(err)
        })
    }
  },
  mounted() {
    this.getCart()
    const anLottie = this.lottie.loadAnimation({
      container: this.$refs.emptyCart,
      animType: 'svg',
      loop: true,
      path: 'https://lottie.host/d6b9ff64-e007-4565-999e-ce83c26d82f9/LueoasihD3.json'
    })
    anLottie.setSpeed(1)
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    cartData() {
      const cartData = this.$store.getters['Cart/getCart']
      return cartData
    }
  }
}
</script>
<style lang="scss" scoped>
#emptyCart {
  height: 300px;
}
.pre-pic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}
</style>
