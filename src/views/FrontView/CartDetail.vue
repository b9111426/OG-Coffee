<template>
  <div class="row mb-3">
    <div class="col-12">
      <div class="card">
        <div class="card-header d-flex py-3">
          <h4>產品總數: ( {{ cartData.length }}件 )</h4>
          <div v-if="isLoading" class="ms-auto">
            <img class="loading" src="@/assets/images/load.gif" alt="" />
          </div>
        </div>
        <div class="card-body">
          <div class="row border-bottom d-none d-lg-flex">
            <div class="col-3 fw-bold text-nowrap py-2">商品資料</div>
            <div class="col-2 fw-bold text-nowrap py-2">優惠卷</div>
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
            <div class="order-2 order-lg-1 col-8 col-lg-2 text-nowrap py-2">
              <div v-if="i.coupon">
                <div
                  class="border border-primary text-black p-2 rounded-3 d-flex justify-content-center"
                >
                  <span>優惠卷:</span>
                  <span class="ms-2 text-break">{{ i.coupon?.title }}</span>
                </div>
              </div>
            </div>
            <div class="order-3 order-lg-2 col-4 col-lg-2 text-nowrap py-2">
              <p v-num="i.product.price"></p>
            </div>
            <div class="order-4 order-lg-3 col-8 col-lg-2 text-nowrap py-2">
              <AddMinBtn
                :val="i.qty"
                @add="modify(i.id, i.product_id, i.qty, 'add')"
                @min="modify(i.id, i.product_id, i.qty, 'min')"
                @push-val="pushVal($event, i.id, i.product_id)"
              ></AddMinBtn>
            </div>
            <div class="order-5 order-lg-4 col-4 col-lg-2 text-nowrap py-2">
              <p v-num="i.final_total"></p>
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
          <div
            v-show="cartData.length === 0"
            class="mt-3 py-3"
            id="emptyCart"
            ref="emptyCart"
          >
            <span class="h3 text-gray-dark">購物車無任何商品</span>
          </div>
          <div class="d-flex align-items-center mt-2 flex-wrap">
            <router-link to="/products" class="ms-auto fs-5 me-2 text-nowrap"
              ><i class="bi bi-chevron-double-right me-1"></i>
              繼續購物</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-form @submit="onSubmit" v-slot="{ errors }">
    <div class="row">
      <div class="col-lg-8 col-12 mb-3">
        <div class="card mb-3">
          <div class="card-header">用餐選項</div>
          <div class="card-body">
            <div class="form-check d-inline-block">
              <input
                class="form-check-input"
                type="radio"
                id="forHere"
                value=""
                v-model="isTogo"
              />
              <label class="form-check-label" for="forHere"> 內用 </label>
            </div>
            <div class="form-check d-inline-block ms-3">
              <input
                class="form-check-input"
                type="radio"
                id="toGo"
                value="toGo"
                v-model="isTogo"
              />
              <label class="form-check-label" for="toGo"> 外送 </label>
            </div>
          </div>
        </div>
        <div v-show="isTogo" class="card mb-3">
          <div class="card-header">外送時間</div>
          <div class="card-body d-flex flex-column">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="orderNow"
                value=""
                v-model="isReserve"
              />
              <label class="form-check-label float-start" for="orderNow">
                現在訂餐
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="radio"
                id="orderLater"
                value="reserve"
                v-model="isReserve"
              />
              <label
                class="form-check-label float-start text-start"
                for="orderLater"
              >
                預約訂餐
                (指定送達時間至少2個小時前至7天內訂餐)(外送時間:am9:00~pm9:30)
              </label>
            </div>
            <div v-show="isReserve">
              <div class="d-flex align-items-baseline">
                <label class="form-label text-nowrap me-2" for="orderDate">
                  日期：
                </label>
                <v-field
                  class="form-select mb-3 w-50 flex-shrink-0"
                  id="orderDate"
                  name="預約訂餐日期"
                  :rules="{ required: isReserve !== '' }"
                  as="select"
                  v-model="reserveSelectDate"
                  :class="{ 'is-invalid': errors['預約訂餐日期'] }"
                >
                  <option value="" disabled selected class="text-gray">
                    請選擇您的外送日期
                  </option>
                  <option v-for="i in reserveDate" :key="i" :value="i">
                    {{ i }}
                  </option>
                </v-field>
                <error-message name="預約訂餐日期" class="invalid-feedback">
                </error-message>
              </div>

              <div class="d-flex align-items-baseline">
                <label class="form-label text-nowrap me-2" for="orderTime">
                  時間：
                </label>
                <v-field
                  class="form-select w-50 flex-shrink-0"
                  id="orderTime"
                  :rules="{ required: isReserve !== '' }"
                  as="select"
                  name="預約訂餐時間"
                  v-model="reserveSelectTime"
                  :class="{ 'is-invalid': errors['預約訂餐時間'] }"
                  onmousedown="if(this.options.length>6){this.size=7}"
                  onblur="this.size=0"
                  onchange="this.size=0"
                >
                  <option value="" disabled selected class="text-gray">
                    請選擇您的外送時間
                  </option>
                  <option v-for="i in reserveTime" :key="i" :value="i">
                    {{ i }}
                  </option>
                </v-field>
                <error-message name="預約訂餐時間" class="invalid-feedback">
                </error-message>
              </div>
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
              <span class="me-auto">小結:</span>
              <span
                >NT$
                <span v-num="totalPrice"></span>
              </span>
            </div>
            <div v-if="isTogo" class="mb-2 d-flex">
              <span class="me-auto">外送費:</span>
              <span>NT$ {{ deliveryFee }}</span>
            </div>
            <div class="mb-4 d-flex align-items-center">
              <strong class="me-auto">總計:</strong>
              <strong class="h4"
                >NT$
                <span v-num="finalPrice"></span>
              </strong>
            </div>
            <button
              href="javascript:;"
              type="submit"
              class="btn btn-success w-100"
            >
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-form>
  <!-- 刪除產品 -->
  <DelModal
    :item="tempProduct"
    ref="delModal"
    @del-item="delCartProduct"
  ></DelModal>
  <pre>{{ cartData }}</pre>
</template>

<script>
import _ from 'lodash'
import DelModal from '@/components/DelModal.vue'
import AddMinBtn from '@/components/AddMinBtn.vue'

export default {
  emits: ['setProgress'],
  data() {
    return {
      isLoadingItem: '',
      tempProduct: {},
      isLoading: false,
      isTogo: '',
      isReserve: '',
      reserveDate: [],
      reserveSelectDate: '',
      reserveSelectTime: ''
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
      } else if (qty > 999) {
        qty = 999
        this.isLoading = false
        return
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
    pushVal: _.debounce(async function (val, id, p_id) {
      this.isLoading = true
      const obj = {
        id,
        data: {
          product_id: p_id,
          qty: val
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
    },
    onSubmit: _.debounce(function () {
      if (this.cartData.length === 0) {
        this.$store.dispatch('fireToast', {
          title: '購物車無商品',
          style: 'danger'
        })
        return
      }
      this.$emit('setProgress', 1)
      const data = {
        isTogo: this.isTogo,
        isReserve: this.isReserve,
        reserveSelectDate: this.reserveSelectDate,
        reserveSelectTime: this.reserveSelectTime,
        finalPrice: this.finalPrice,
        deliveryFee: this.deliveryFee,
        totalPrice: this.totalPrice
      }
      this.$store.dispatch('Orders/sendOrderInfo', data)
      this.$router.push('/cart/checkout')
    }, 500),
    handDateAry() {
      let num = 0
      const hours = new Date().getHours()
      //如果超過晚上7點，只能訂隔天
      if (hours > 19) {
        num = 1
      }
      for (let idx = num; idx < num + 7; idx++) {
        let unix = new Date().getTime()
        let str = new Date(unix + 86400000 * idx).toLocaleDateString()
        this.reserveDate.push(str)
      }
    }
  },
  mounted() {
    this.createLottie()
  },
  created() {
    this.handDateAry()
    this.getCart()
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    cartData() {
      return this.$store.getters['Cart/getCart']
    },
    totalPrice() {
      return this.$store.getters['Cart/finalTotal']
    },
    finalPrice() {
      return this.totalPrice + this.deliveryFee
    },
    reserveTime() {
      let ary = []
      let startHours = 9
      const hours = new Date().getHours()
      let lastHours = startHours + (hours - startHours) + 2
      const num = hours - startHours + 2
      const today = new Date().toLocaleDateString()
      //判斷是否為當天，如果是當天判斷可訂的剩餘時間
      if (this.reserveSelectDate === today) {
        for (let idx = 0; idx < 13 - num; idx++) {
          ary.push(`${lastHours + idx}:00`)
          ary.push(`${lastHours + idx}:30`)
        }
      } else {
        for (let idx = 0; idx < 13; idx++) {
          ary.push(`${startHours + idx}:00`)
          ary.push(`${startHours + idx}:30`)
        }
      }

      return ary
    },
    deliveryFee() {
      if (this.isTogo) {
        return 50
      } else {
        return 0
      }
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
.loading {
  height: 32px;
}
.product-item:hover {
  background-color: #eee;
}
</style>
