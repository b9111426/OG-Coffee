<template>
  <div class="container py-5">
    <h4 class="mb-5">取得優惠卷</h4>

    <div class="row row-cols-lg-2 row-cols-1 g-3">
      <div
        v-for="i in coupons"
        :key="i.id"
        class="col d-flex justify-content-center position-relative"
      >
        <div class="coupon position-relative">
          <div
            class="coupon-inner position-absolute start-0 ms-2 h-100 d-flex align-items-center"
          >
            <div class="coupon-inner-left bg-danger h-100 px-4 px-lg-5">
              <i class="bi bi-bag fs-3"></i>
              <div>
                <span class="fs-4">{{ i.percent / 10 }}</span>
                <br />
                <span class="text-nowrap">折卷</span>
              </div>
            </div>
            <div
              class="d-flex flex-column justify-content-around align-items-start ps-2 h-100"
            >
              <h3 class="text-dark">{{ i.title }}</h3>
              <p class="text-dark"><span v-date="i.due_date"></span> 失效</p>
              <p class="text-dark">折購碼: {{ i.code }}</p>
            </div>
          </div>
          <button
            type="button"
            class="coupon-btn btn btn-danger position-absolute top-50 end-0 translate-middle"
            @click="aaa($event)"
          >
            領取
          </button>
          <div class="coupon-bg position-relative aaa"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheckRequest } from '@/api'
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  created() {
    this.checkLogin()
  },
  methods: {
    async getCoupons(page = 1) {
      this.$store.dispatch('handLoading', true)
      try {
        await this.$store.dispatch('Coupon/getCoupons', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    async checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)ogCoffeeToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        try {
          await apiCheckRequest(token)
          this.checkSuccess = true
          this.getCoupons()
        } catch (err) {
          this.$store.dispatch('fireToast', { title: '請重新登入' })
          this.$router.push('/login')
        }
      } else {
        this.$store.dispatch('fireToast', { title: '請先登入' })
        this.$router.push('/login')
      }
    },
    aaa(e) {
      console.log(e.target.parentNode)
      e.target.parentNode.classList.add('d-none')
    }
  },
  computed: {
    coupons() {
      return this.$store.getters['Coupon/couponsData']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.coupon {
  width: 400px;
  height: 125px;
  color: #fff;
  @include phone() {
    width: 330px;
  }

  &-bg {
    position: relative;
    width: inherit;
    height: inherit;
    background: radial-gradient(
      transparent 0,
      transparent 5px,
      var(--danger) 5px
    );
    z-index: -2;
    background-size: 15px 15px;
    background-position: 11px 3px;
  }

  &-bg:before {
    position: absolute;
    left: 12px;
    bottom: 0;
    content: '';
    width: inherit;
    height: inherit;
    z-index: -1;
    background-color: var(--primary);
    border-radius: 0 10px 10px 0;
  }
  &-btn {
    margin-right: -25px;
  }
}
</style>
