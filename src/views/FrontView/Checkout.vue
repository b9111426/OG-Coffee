<template>
  <v-form
    :validation-schema="schema"
    @submit="onSubmit"
    v-slot="{ errors }"
    ref="form"
  >
    <div class="container mt-5">
      <div class="row row-cols-3 justify-content-center">
        <div class="col-lg-8 col-12 mb-5">
          <div class="card mb-3">
            <div class="card-header">選擇付款類型</div>
            <div class="card-body d-flex flex-column">
              <div class="form-check py-2 border-bottom">
                <v-field
                  class="form-check-input"
                  type="radio"
                  name="付款類型"
                  value="cash"
                  id="cash"
                  v-model="user.payment"
                  :class="{ 'is-invalid': errors['付款類型'] }"
                >
                </v-field>
                <label class="form-check-label float-start" for="cash">
                  現金
                </label>
                <img class="float-end" src="@/assets/images/money.png" alt="" />
              </div>
              <div class="form-check py-2 border-bottom">
                <v-field
                  class="form-check-input"
                  type="radio"
                  name="付款類型"
                  value="creditCard"
                  id="creditCard"
                  v-model="user.payment"
                  :class="{ 'is-invalid': errors['付款類型'] }"
                >
                </v-field>
                <label class="form-check-label float-start" for="creditCard">
                  信用卡
                </label>
                <img
                  class="float-end"
                  src="@/assets/images/credit-card.png"
                  alt=""
                />
              </div>
              <div class="form-check py-2 border-bottom">
                <v-field
                  class="form-check-input"
                  type="radio"
                  value="linePay"
                  id="linePay"
                  name="付款類型"
                  v-model="user.payment"
                  :class="{ 'is-invalid': errors['付款類型'] }"
                >
                </v-field>
                <label class="form-check-label float-start" for="linePay">
                  LINE Pay
                </label>
                <img class="float-end" src="@/assets/images/line.png" alt="" />
              </div>
              <div class="form-check pt-2 pb-4">
                <v-field
                  class="form-check-input"
                  type="radio"
                  name="付款類型"
                  value="googlePay"
                  id="linePay"
                  v-model="user.payment"
                  :class="{ 'is-invalid': errors['付款類型'] }"
                >
                </v-field>
                <label class="form-check-label float-start" for="googlePay">
                  Google Pay
                </label>
                <img
                  class="float-end"
                  src="@/assets/images/google-pay.png"
                  alt=""
                />
                <error-message name="付款類型" class="invalid-feedback">
                </error-message>
              </div>

              <div class="form-check clearfix">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="bill"
                  v-model="user.bill"
                />
                <label class="form-check-label float-start" for="bill"
                  >發票</label
                >
              </div>

              <div class="d-flex align-items-baseline">
                <label for="uniform-numbers" class="form-label text-nowrap me-2"
                  >統一編號:</label
                >
                <v-field
                  type="text"
                  class="form-control"
                  name="統一編號"
                  id="uniform-numbers"
                  v-model="user.uniformNum"
                  :class="{ 'is-invalid': errors['統一編號'] }"
                >
                </v-field>
                <error-message name="統一編號" class="invalid-feedback">
                </error-message>
              </div>
            </div>
          </div>
          <div v-if="user.isTogo" class="card">
            <div class="card-header">填寫外送資料</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="email" class="form-label h6 mt-3">Email</label>
                <v-field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="請輸入 Email"
                  v-model="user.email"
                  :class="{ 'is-invalid': errors['email'] }"
                >
                </v-field>
                <error-message name="email" class="invalid-feedback">
                </error-message>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label h6 mt-3">取件人姓名</label>
                <v-field
                  id="name"
                  name="取件人姓名"
                  type="text"
                  class="form-control"
                  placeholder="請輸入姓名"
                  v-model="user.name"
                  :class="{ 'is-invalid': errors['取件人姓名'] }"
                ></v-field>
                <error-message name="取件人姓名" class="invalid-feedback">
                </error-message>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label h6 mt-3">取件人電話</label>
                <v-field
                  id="phone"
                  name="電話"
                  type="text"
                  class="form-control"
                  v-model="user.tel"
                  placeholder="請輸入電話"
                  :class="{ 'is-invalid': errors['電話'] }"
                >
                </v-field>
                <error-message name="電話" class="invalid-feedback">
                </error-message>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label h6 mt-3">外送地址</label>
                <v-field
                  id="address"
                  name="外送地址"
                  type="text"
                  class="form-control"
                  placeholder="請輸入地址"
                  v-model="user.address"
                  :class="{ 'is-invalid': errors['外送地址'] }"
                >
                </v-field>
                <error-message name="外送地址" class="invalid-feedback">
                </error-message>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label h6 mt-3">訂單備註</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  v-model="message"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-header">訂單資訊</div>
            <div v-if="user.isTogo">
              <div class="card-body border-bottom">
                <div class="d-flex">
                  <span class="text-nowrap">送餐至:</span>
                  <span class="text-break text-start ms-3">
                    {{ user.address }}
                  </span>
                </div>
              </div>
              <div class="card-body border-bottom">
                <div class="d-flex flex-column align-items-start">
                  <p class="me-auto text-nowrap">預計送達時間：</p>
                  <span class="text-break" style="font-size: 1rem">
                    {{ handTimes }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body border-bottom">
              <div class="d-flex flex-column">
                <p class="me-auto mb-2">
                  已領取的優惠卷:
                  <span v-if="myCoupons === null">目前無優惠卷</span>
                </p>
                <div class="d-block">
                  <div class="input-group input-group-sm mb-3">
                    <select class="form-select" ref="couponSelect">
                      <option selected disabled>選取您優惠卷</option>
                      <option
                        :value="i.code"
                        v-for="i in myCoupons"
                        :key="i.id"
                      >
                        {{ i.title }} {{ i.percent / 10 }}折券
                      </option>
                    </select>
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      @click="useCoupon"
                    >
                      使用
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body border-bottom">
              <div class="mb-2 d-flex align-items-center">
                <span class="me-auto">小結:</span>
                <div v-if="isLoading">
                  <img class="loading" src="@/assets/images/load.gif" alt="" />
                </div>
                <span
                  >NT$
                  <span v-num="user.totalPrice"></span>
                </span>
              </div>
              <div v-if="user.isTogo" class="mb-2 d-flex">
                <span class="me-auto">外送費:</span>
                <span>NT$ {{ user.deliveryFee }}</span>
              </div>
              <div class="mb-4 d-flex align-items-center">
                <strong class="me-auto">總計:</strong>
                <div v-if="isLoading">
                  <img class="loading" src="@/assets/images/load.gif" alt="" />
                </div>
                <strong class="h4"
                  >NT$
                  <span v-num="user.finalPrice"></span>
                </strong>
              </div>
              <button class="btn btn-success w-100" type="submit">
                結帳並送出訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-form>
</template>

<script>
import _ from 'lodash'
export default {
  emits: ['setProgress'],
  data() {
    return {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        bill: '',
        uniformNum: ''
      },
      message: '',
      couponCode: '',
      isLoading: false
    }
  },
  methods: {
    onSubmit: _.debounce(async function () {
      if (this.user.isTogo === '') {
        this.user.name = '內用'
        this.user.email = '內用'
        this.user.tel = '內用'
        this.user.address = '內用'
      }
      try {
        const data = {
          data: {
            user: this.user,
            message: this.message
          }
        }

        await this.$store.dispatch('Orders/submitOrder', data)
        this.$refs.form.resetForm()
        this.$emit('setProgress', 2)
        this.$store.dispatch('fireToast', {
          title: '訂單建立成功',
          style: 'success'
        })
        setTimeout(() => {
          this.$router.push('/cart')
        }, 1200)
      } catch (err) {
        throw new Error(err)
      }
    }, 500),
    isPhone(val) {
      if (val === '' || null) {
        return '電話為必填'
      }
      const phoneNumber = /((?=(09))[0-9]{10})$/
      return phoneNumber.test(val) ? true : '需為正確的電話號碼'
    },
    isUniformNum(val) {
      if (val == '') {
        return true
      }
      const uniform = /^[0-9]{8}$/
      return uniform.test(val) ? true : '需為正確的統一編號'
    },
    async useCoupon() {
      const code = this.$refs.couponSelect.value
      try {
        this.isLoading = true
        const data = {
          data: { code }
        }
        const res = await this.$store.dispatch('Coupon/postFrontCoupon', data)
        this.getCart()
        const user = this.user
        user.totalPrice = res.data.data.final_total
        user.finalPrice = user.totalPrice + user.deliveryFee
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        throw new Error(err)
      }
    },
    async getCart() {
      try {
        await this.$store.dispatch('Cart/getCart')
      } catch (err) {
        throw new Error(err)
      }
    }
  },

  created() {
    const data = this.$store.getters['Orders/orderInfo']
    Object.assign(this.user, data)
  },
  computed: {
    handTimes() {
      const data = this.$store.getters['Orders/orderInfo']
      return `${data.reserveSelectDate} ${data.reserveSelectTime}`
    },
    schema() {
      const obj = {
        付款類型: (errors) => {
          if (errors) {
            return true
          }
          return '付款類型為必選'
        },
        統一編號: this.isUniformNum
      }
      //依外帶或內用辨別需要驗證選項
      if (!this.user.isTogo) {
        return obj
      } else {
        obj.email = 'required|email'
        obj['取件人姓名'] = 'required'
        obj['電話'] = this.isPhone
        obj['外送地址'] = 'required'
        return obj
      }
    },
    myCoupons() {
      return JSON.parse(localStorage.getItem('myCoupon'))
    }
  }
}
</script>

<style lang="scss" scoped></style>
