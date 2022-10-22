<template>
  <div class="container">
    <h2 class="my-5">購物車</h2>
    <div class="card overflow-auto flex-nowrap mt-3 px-3">
      <table class="table mt-4 table-hover">
        <thead>
          <tr class="table-light">
            <th width="120" class="text-nowrap">分類</th>
            <th width="150" class="text-center text-nowrap px-5">預覽</th>
            <th class="text-center text-nowrap">產品名稱</th>
            <th width="120" class="text-end d-none d-lg-table-cell">原價</th>
            <th width="120" class="text-end text-nowrap">售價</th>
            <th width="145" class="text-center d-none d-lg-table-cell">
              是否啟用
            </th>
            <th width="160" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <!--<tr class="align-middle">
            <td>{{ item.category }}</td>
            <td class="text-center">
              <div class="position-relative d-inline-block overflow-hidden">
                <div
                  v-if="item.is_soldOut"
                  class="position-absolute sellOutTag bg-danger"
                ></div>
                <img
                  class="pre-pic img-thumbnail"
                  :src="item.imageUrl[0]"
                  alt="縮圖"
                />
              </div>
            </td>
            <td class="text-nowrap">{{ item.title }}</td>
            <td class="text-end d-none d-lg-table-cell">
              {{ item.price }}
            </td>
            <td class="text-lg-end text-center">
              {{ item.price * item.origin_price }}
            </td>
            <td class="d-none d-lg-table-cell">
              <div class="container ps-4">
                <div class="form-check d-flex justify-content-start">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    :id="item.id"
                    v-model="item.is_enabled"
                    @change="updateProduct({ product: item, isNew: false })"
                  />
                  <label
                    class="form-check-label"
                    :for="`flexSwitchCheckDefault${item.id}`"
                  >
                    <span v-if="item.is_enabled" class="text-primary"
                      >啟用</span
                    >
                    <span v-else class="text-gray-dark">未啟用</span>
                  </label>
                </div>
              </div>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="openModal(false, item)"
                >
                  <span class="d-lg-block d-none">編輯</span>
                  <i class="bi bi-pencil-square d-lg-none"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="openDelModal(item)"
                >
                  <span class="d-lg-block d-none">刪除</span>
                  <i class="bi bi-x-lg d-lg-none"></i>
                </button>
              </div>
            </td>
          </tr>-->
        </tbody>
        <tbody v-if="catData.length === 0" class="text-center">
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
  <pre>{{ catData }}</pre>
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
      await this.$store.dispatch('Cart/getCart')
      this.$store.dispatch('handLoading', false)
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
    this.getProducts()
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
    catData() {
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
</style>
