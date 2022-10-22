<template>
  <div class="container mt-3">
    <div class="row row-cols-2">
      <div class="col">
        <div class="row mb-2">
          <div class="col">
            <img
              v-if="isShow"
              ref="pic1"
              class="img-fluid img-thumbnail"
              :src="product.imageUrl[0]"
              alt=""
            />
          </div>
        </div>
        <div class="row g-3">
          <div
            v-for="(i, idx) in product.imageUrl.splice(1)"
            :key="i + idx"
            class="col-4"
            @click="changPic($event)"
          >
            <img class="subImg img-fluid img-thumbnail" :src="i" alt="" />
          </div>
        </div>
      </div>
      <div class="col">
        <h3 class="text-start">{{ product.title }}</h3>
        <h4 class="text-start mb-5">{{ product.subtitle }}</h4>
        <p class="text-start mb-5">{{ product.description }}</p>
        <div v-if="isShow">
          <!--價錢數量-->
          <div class="row g-3 mb-3">
            <div class="col-2 d-flex align-items-center">
              <h6 class="text-center">
                {{ unitAry[0] }}
              </h6>
            </div>
            <div class="col-5 d-flex justify-content-around align-items-center">
              <p class="text-decoration-line-through">NT${{ product.price }}</p>
              <strong
                >NT${{
                  Math.floor(product.price * product.origin_price)
                }}</strong
              >
            </div>
            <div class="col-5">
              <div v-if="isShow" class="input-group input-group-sm flex-nowrap">
                <button
                  class="btn btn-gray"
                  type="button"
                  id="button-addon1"
                  @click="min"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input
                  type="text"
                  v-model="qty"
                  @input="limitNum($event)"
                  class="form-control text-center"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button
                  class="btn btn-gray"
                  type="button"
                  id="button-addon1"
                  @click="qty++"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 g-3 mb-3">
          <div class="col">
            <button
              v-if="isShow"
              type="button"
              class="btn btn-primary w-100"
              @click="addToCart(product.id, qty)"
            >
              加入購物車
            </button>
          </div>
          <div class="col">
            <button
              v-if="isShow"
              type="button"
              class="btn btn-success w-100"
              @click="goCartView"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ product }}</pre>
</template>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: []
      },
      isShow: false,
      unitAry: [],
      qty: 1
    }
  },
  methods: {
    min() {
      this.qty--
      if (this.qty <= 1) {
        this.qty = 1
      }
    },
    limitNum(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    async addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      try {
        await this.$store.dispatch('Cart/addCart', data)
        this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('Cart/setJello')
      } catch (err) {
        throw new Error(err)
      }
    },
    async getProduct() {
      try {
        const { id } = this.$route.params
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
        this.unitAry = this.product.unit.split('、')
        this.isShow = true
        this.$store.dispatch('Products/setLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    changPic(e) {
      let url2 = e.target.getAttribute('src')
      let url1 = this.$refs.pic1.getAttribute('src')
      e.target.setAttribute('src', url1)
      this.$refs.pic1.setAttribute('src', url2)
    },
    goCartView() {
      this.$router.push({ path: '/cart' })
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
<style lang="scss" scoped>
.subImg {
  cursor: pointer;
}
</style>
