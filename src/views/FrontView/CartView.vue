<template>
  <div class="container">
    <div class="row">
      <div class="progressBox mt-3">
        <ul id="progressbar">
          <li class="active">購物車</li>
          <li>填寫資料</li>
          <li>結帳</li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex py-3">
            <h4>產品總數: ( {{ productNum }}件 )</h4>
            <div v-if="isLoading" class="ms-auto">
              <img class="loading" src="@/assets/images/load.gif" alt="" />
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
              class="row border-bottom px-2 py-3 product-item"
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
            <div class="d-flex mt-2">
              <router-link to="/products" class="ms-auto"
                ><i class="bi bi-chevron-double-right me-1"></i>
                繼續購物</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-12 mb-3">
        <div class="card mb-3">
          <div class="card-header">用餐選項</div>
          <div class="card-body">
            <div class="form-check d-inline-block">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                內用
              </label>
            </div>
            <div class="form-check d-inline-block ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                外送
              </label>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">加購及購物袋</div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="card">
          <div class="card-header">訂單資訊</div>
          <div class="card-body">
            <div class="mb-2 d-flex">
              <span class="me-auto">小結:</span> <span>NT$999</span>
            </div>
            <div class="mb-2 d-flex">
              <span class="me-auto">外送費:</span> <span>NT$999</span>
            </div>
            <div class="mb-4 d-flex align-item-center">
              <strong class="me-auto">總計:</strong>
              <strong class="h4">NT$999</strong>
            </div>
            <router-link class="btn btn-success w-100" to="/checkout"
              >前往結帳</router-link
            >
          </div>
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
@import '~@/assets/stylesheets/mixin';
#emptyCart {
  height: 300px;
}
.pre-pic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}
.loading {
  height: 32px;
}
.product-item:hover {
  background-color: #eee;
}

#progressbar {
  overflow: hidden;
  counter-reset: step;
}

#progressbar li {
  list-style-type: none;
  color: #333;
  text-transform: uppercase;
  font-size: 1.2rem;
  width: 33.33333%;
  float: left;

  position: relative;
}

#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 20px;
  line-height: 20px;
  display: block;
  font-size: 1rem;
  color: #333;
  background: #fff;
  border-radius: 3px;
  padding: 10px 30px 10px 20px;
  margin: 0 auto 5px auto;
  @include pad() {
    line-height: 10px;
    padding: 10px 20px 10px 10px;
  }
}

#progressbar li:after {
  content: '';
  width: 100%;
  height: 2px;
  background: #fff;
  position: absolute;
  left: -50%;
  top: 25%;
  z-index: -1;
}

#progressbar li:first-child:after {
  content: none;
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: var(--primary);
  color: white;
}

.progressBox {
  padding: 20px;
  margin: 0 auto;
  width: 50%;
  @include pad() {
    width: 100%;
  }
}
</style>
