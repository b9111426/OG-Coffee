<template>
  <h2>後台優惠卷</h2>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12 d-flex">
        <div class="ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
        <button
          class="btn btn-primary ms-2"
          type="button"
          @click="openCouponModal(true)"
        >
          建立新的優惠券
        </button>
      </div>
      <div class="col-12">
        <div class="card overflow-auto flex-nowrap mt-2 px-3">
          <table class="table mt-4 table-hover">
            <thead>
              <tr class="table-light">
                <th class="text-nowrap">名稱</th>
                <th class="text-nowrap">折扣百分比</th>
                <th class="text-nowrap">到期日</th>
                <th
                  width="145"
                  class="text-center d-none d-lg-table-cell text-nowrap px-3"
                >
                  是否啟用
                </th>
                <th width="160" class="text-center text-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in coupons" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}%</td>
                <td>{{ $filters.date(item.due_date) }}</td>
                <td class="d-none d-lg-table-cell">
                  <div class="ps-4">
                    <div class="form-check d-flex justify-content-start">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="item.id"
                        v-model="item.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        @change="updateCoupon(item, item.id)"
                      />
                      <label
                        class="form-check-label ms-2"
                        :for="`couponSwitch${item.id}`"
                      >
                        <span
                          v-if="item.is_enabled === 1"
                          class="text-primary text-nowrap"
                          >啟用</span
                        >
                        <span v-else class="text-gray-dark text-nowrap"
                          >未啟用</span
                        >
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="openCouponModal(false, item)"
                    >
                      <span class="d-lg-block d-none text-nowrap">編輯</span>
                      <i class="bi bi-pencil-square d-lg-none"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="openDelCouponModal(item)"
                    >
                      <span class="d-lg-block d-none text-nowrap">刪除</span>
                      <i class="bi bi-x-lg d-lg-none"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"></DelModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  inject: ['emitter'],
  components: { CouponModal, DelModal },
  props: {
    config: Object
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    }
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    getCoupons() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http
        .get(url, this.tempProduct)
        .then((response) => {
          this.coupons = response.data.coupons
          this.$store.dispatch('handLoading', false)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    updateCoupon(item) {
      this.emitter.emit('loading')
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMeths = 'post'
      this.tempCoupon = item
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMeths = 'put'
      }
      this.$http[httpMeths](url, { data: this.tempCoupon })
        .then((res) => {
          this.getCoupons()
          this.$refs.couponModal.hideModal()
          this.$httpMessageState(res, '更新付款狀態')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.emitter.emit('loading')
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.$httpMessageState(res, res.data.message)
          this.getCoupons()
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.emitter.emit('loading')
    this.getCoupons()
  }
}
</script>
