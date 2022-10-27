<template>
  <h2>後台優惠卷</h2>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12 col-lg-6 d-flex align-items-center mb-2 mb-lg-0">
        <div class="bg-white p-2 rounded text-dark">
          <strong> 產品總數: {{}} </strong>
        </div>
        <div class="bg-white p-2 rounded text-dark ms-4">
          <strong> 已啟用 : {{}} </strong>
        </div>
      </div>
      <div
        class="col-12 col-lg-6 d-flex justify-content-end align-items-center"
      >
        <div v-if="isLoading" class="ms-auto">
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
                        @change="updateCoupon({ coupon: item, isNew: false })"
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
  <Pagination
    :pages="pagination"
    @emitPages="getCoupons"
    class="mt-3 pb-5"
  ></Pagination>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import _ from 'lodash'
export default {
  components: { CouponModal, DelModal, Pagination },
  props: {
    config: Object
  },
  data() {
    return {
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false,
      currentPage: 1,
      title: '優惠卷'
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
    async getCoupons(page = 1) {
      try {
        await this.$store.dispatch('Coupon/getCoupons', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    updateCoupon: _.debounce(async function ({ coupon, isNew }) {
      this.isLoading = true
      const couponModal = this.$refs.couponModal
      try {
        let res = null
        if (!isNew) {
          const data = { id: coupon.id, coupon }
          res = await this.$store.dispatch('Coupon/modifyCoupon', data)
        } else {
          res = await this.$store.dispatch('Coupon/addCoupon', coupon)
        }
        couponModal.hideModal()
        this.$store.dispatch('fireToast', { res })
        this.getCoupons(this.currentPage)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 1000),
    delCoupon: _.debounce(async function (title) {
      try {
        this.isLoading = true
        await this.$store.dispatch('Coupon/deleteCoupon', this.tempCoupon.id)
        const delModal = this.$refs.delModal
        delModal.hideModal()
        this.getCoupons(this.currentPage)
        this.isLoading = false
        this.$store.dispatch('fireToast', {
          title: `${title}優惠卷已刪除`,
          style: 'success'
        })
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500)
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getCoupons()
  },
  computed: {
    coupons() {
      return this.$store.getters['Coupon/couponsData']
    },
    pagination() {
      return this.$store.getters['Coupon/couponPage']
    }
  }
}
</script>
