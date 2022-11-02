<template>
  <div class="container mt-3">
    <div class="row row-cols-lg-2 row-cols-1">
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
      <div class="col mt-4 mt-lg-0">
        <h3 class="text-start text-break">{{ product.title }}</h3>
        <h4 class="text-start text-break mb-lg-5 mb-3">
          {{ product.subtitle }}
        </h4>
        <p class="text-start mb-lg-5 mb-3">{{ product.description }}</p>
        <div v-if="isShow">
          <!--價錢數量-->

          <div class="col-12 d-flex align-items-center mb-3">
            <p class="text-center fs-5 me-auto">單位({{ unitAry[0] }})</p>

            <p class="ms-auto text-break fs-4">
              <span
                class="text-decoration-line-through text-danger text-break me-2"
                v-if="product.origin_price !== product.price"
              >
                NT${{ product.origin_price }}
              </span>

              NT${{ product.price }}
            </p>
          </div>
          <div class="col-12 mb-4">
            <div v-if="isShow" class="input-group input-group-sm flex-nowrap">
              <AddMinBtn
                :val="qty"
                @add="add"
                @min="min"
                @push-val="pushVal"
              ></AddMinBtn>
            </div>
          </div>

          <div class="d-flex">
            <div class="col pe-1">
              <button
                v-if="isShow"
                type="button"
                class="btn btn-primary w-100 position-relative"
                @click="addToCart()"
              >
                <div
                  v-if="isLoading"
                  class="position-absolute top-50 end-0 translate-middle"
                >
                  <img class="loading" src="@/assets/images/load.gif" alt="" />
                </div>
                加入購物車
              </button>
            </div>
            <div class="col ps-1">
              <button
                v-if="isShow"
                type="button"
                class="btn btn-success w-100"
                @click="goCartView()"
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddMinBtn from '@/components/AddMinBtn.vue'
import _ from 'lodash'

export default {
  components: {
    AddMinBtn
  },
  data() {
    return {
      product: {
        imageUrl: []
      },
      isShow: false,
      isLoading: false,
      unitAry: [],
      qty: 1
    }
  },
  methods: {
    add() {
      this.qty++
    },
    min() {
      this.qty--
      if (this.qty <= 1) {
        this.qty = 1
      }
    },
    pushVal(val) {
      this.qty = val
    },
    addToCart: _.debounce(async function () {
      this.isLoading = true
      const data = {
        product_id: this.product.id,
        qty: this.qty
      }
      try {
        await this.$store.dispatch('Cart/addCart', data)
        this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('Cart/setShake')
        this.isLoading = false
      } catch (err) {
        throw new Error(err)
      }
    }, 500),
    async getProduct() {
      try {
        const { id } = this.$route.params
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
        this.unitAry = this.product.unit.split('、')
        this.isShow = true
        this.$store.dispatch('Products/setBreadcrumb', this.product.title)
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
    goCartView: _.debounce(function () {
      this.addToCart()
      this.$router.push({ path: '/cart' })
    }, 500)
  },
  created() {
    this.getProduct()
  }
}
</script>
<style lang="scss" scoped>
.subImg {
  cursor: pointer;
}
</style>
