<template>
  <div class="container">
    <h2 class="my-5">購物車</h2>
    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex py-3">
            <h5>產品總數: ( {{ productNum }}件 )</h5>
            <div v-if="isLoading" class="ms-auto">
              <img class="loading02" src="@/assets/images/load02.gif" alt="" />
            </div>
          </div>
          <div class="card-body">
            <div class="row border-bottom d-none d-lg-flex">
              <div class="col-3 fw-bold text-nowrap py-2">商品資料</div>
              <div class="col-2 fw-bold text-nowrap py-2">優惠</div>
              <div class="col-2 fw-bold text-nowrap py-2">單件價格</div>
              <div class="col-2 fw-bold text-nowrap py-2">數量</div>
              <div class="col-2 fw-bold text-nowrap py-2">小計</div>
              <div class="col-1 fw-bold text-nowrap py-2"></div>
            </div>
            <div
              class="row border-bottom px-2 py-3"
              v-for="i in cartData"
              :key="i.id"
            >
              <div class="order-0 order-lg-0 col-lg-3 col-10 d-flex py-2">
                <img
                  class="pre-pic img-thumbnail"
                  :src="i.product.imageUrl[0]"
                  alt="縮圖"
                />
                <div class="ms-1 text-start">
                  <p class="text-break">{{ i.product.title }}</p>
                  <p class="text-break">{{ i.product.category }}</p>
                </div>
              </div>
              <div
                class="order-2 order-lg-1 col-8 col-lg-2 text-nowrap py-2"
              ></div>
              <div class="order-3 order-lg-2 col-4 col-lg-2 text-nowrap py-2">
                <p v-price="i.product.price"></p>
              </div>
              <div class="order-4 order-lg-3 col-8 col-lg-2 text-nowrap py-2">
                <AddMinBtn
                  :val="i.qty"
                  @add="modify(i.id, i.product_id, i.qty, 'add')"
                  @min="modify(i.id, i.product_id, i.qty, 'min')"
                  @push-val="pushVal"
                ></AddMinBtn>
              </div>
              <div class="order-5 order-lg-4 col-4 col-lg-2 text-nowrap py-2">
                <p v-price="i.final_total"></p>
              </div>
              <div class="order-1 order-lg-5 col-2 col-lg-1 text-nowrap">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm m-2"
                  @click="openDelModal(i.product.title, i.id)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-12 mb-3">
        <div class="card">
          <div class="card-header">選擇送貨及付款方式</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="card">
          <div class="card-header">訂單資訊</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- 刪除產品 -->
  <DelModal
    :item="tempProduct"
    ref="delModal"
    @del-item="delCartProduct"
  ></DelModal>
</template>

<script>
import _ from 'lodash'
import DelModal from '@/components/DelModal.vue'
import AddMinBtn from '@/components/AddMinBtn.vue'
export default {
  data() {
    return {
      isLoadingItem: '',
      tempProduct: {},
      qty: 1,
      isLoading: false
    }
  },
  components: {
    DelModal,
    AddMinBtn
  },
  methods: {
    modify: _.debounce(async function (id, p_id, qty, str) {
      this.isLoading = true
      str === 'add' ? qty++ : qty--
      if (qty <= 1) {
        qty = 1
      }
      const obj = {
        id,
        data: {
          product_id: p_id,
          qty
        }
      }
      try {
        await this.$store.dispatch('Cart/modifyCart', obj)
        await this.$store.dispatch('Cart/getCart')
        this.isLoading = false
      } catch (err) {
        throw new Error(err)
      }
    }, 500),
    pushVal(val) {
      this.qty = val
    },
    openDelModal(title, id) {
      this.tempProduct.title = title
      this.tempProduct.id = id
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    async getCart() {
      try {
        await this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    delCartProduct: _.debounce(async function (title) {
      try {
        await this.$store.dispatch('Cart/deleteCart', this.tempProduct.id)

        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$store.dispatch('fireToast', {
          title: `${title}已刪除`,
          style: 'success'
        })
        this.getCart()
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500),
    createLottie() {
      const anLottie = this.lottie.loadAnimation({
        container: this.$refs.emptyCart,
        animType: 'svg',
        loop: true,
        path: 'https://lottie.host/d6b9ff64-e007-4565-999e-ce83c26d82f9/LueoasihD3.json'
      })
      anLottie.setSpeed(1)
    }
  },
  mounted() {
    this.createLottie()
  },
  created() {
    this.getCart()
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    cartData() {
      const cartData = this.$store.getters['Cart/getCart']
      return cartData
    },
    productNum() {
      const cartData = this.$store.getters['Cart/getCart']
      return cartData.length
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
