<template>
  <div class="container py-3">
    <h2>後台優惠卷</h2>
    <div class="row mt-4">
      <div
        class="col-12 d-flex align-items-center justify-content-between mb-2 mb-lg-0"
      >
        <div class="bg-white p-2 rounded text-dark">
          <strong> 產品總數: {{ allCouponsNum }} </strong>
        </div>
        <div v-if="isLoading" class="me-3 ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
        <button
          class="btn btn-primary"
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
              <tr
                v-for="item in coupons"
                :key="item.id"
                :class="{ 'text-secondary': !item.is_enabled }"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}%</td>
                <td><span v-date="item.due_date"></span></td>
                <td class="d-none d-lg-table-cell">
                  <div class="ps-4">
                    <div class="form-check d-flex justify-content-start">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        :id="`couponSwitch${item.id}`"
                        v-model="item.is_enabled"
                        @change="updateCoupon({ coupon: item, isNew: false })"
                      />
                      <label
                        class="form-check-label"
                        :for="`couponSwitch${item.id}`"
                      >
                        <span
                          v-if="item.is_enabled"
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
            <tbody v-if="coupons.length === 0" class="text-center">
              <td colspan="5" class="fs-3 text-gray py-4">文章列表已空</td>
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
  <DelModal
    :item="tempCoupon"
    :title="title"
    ref="delModal"
    @del-item="delCoupon"
  ></DelModal>
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
      tempCoupon: {},
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
        this.getAllCoupons()
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    async getAllCoupons() {
      try {
        await this.$store.dispatch('Coupon/getAllCoupons')
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
    },
    allCouponsNum() {
      return this.$store.getters['Coupon/allCouponsNum']
    }
  }
}
</script>
