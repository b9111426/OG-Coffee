<template>
  <div class="container py-5">
    <p class="mb-5">登入取得優惠卷</p>

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
            <div
              class="coupon-inner-left bg-danger h-100 px-4 px-lg-5"
              :class="today > i.due_date ? 'bg-gray-dark' : 'bg-danger'"
            >
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
              <h6 class="text-dark">{{ i.title }}</h6>
              <p class="text-dark"><span v-date="i.due_date"></span> 失效</p>
              <p class="text-dark">折購碼: {{ i.code }}</p>
            </div>
          </div>
          <button
            v-if="today < i.due_date"
            type="button"
            class="coupon-btn btn btn-danger position-absolute top-50 end-0 translate-middle"
            @click="takeCoupon(i)"
          >
            領取
          </button>
          <div
            class="coupon-bg position-relative"
            :class="{ gray: today > i.due_date }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheckRequest } from '@/api'
import _ from 'lodash'
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
          this.$store.dispatch('toPage', '/coupon')
          this.$router.push('/login')
        }
      } else {
        this.$store.dispatch('fireToast', { title: '請先登入' })
        this.$router.push('/login')
      }
    },
    takeCoupon: _.debounce(function (item) {
      const data = JSON.parse(localStorage.getItem('myCoupon'))
      if (data === null) {
        const obj = []
        obj.push(item)
        localStorage.setItem('myCoupon', JSON.stringify(obj))
        this.$store.dispatch('fireToast', {
          title: `「${item.title}」優惠卷已領取`,
          style: 'success'
        })
      } else {
        const ary = data.filter((i) => {
          return i.id.includes(item.id)
        })
        if (ary.length === 0) {
          data.push(item)
          localStorage.setItem('myCoupon', JSON.stringify(data))
          this.$store.dispatch('fireToast', {
            title: `「${item.title}」優惠卷已領取`,
            style: 'success'
          })
        } else {
          this.$store.dispatch('fireToast', {
            title: `「${item.title}」優惠卷已領取過`,
            style: 'danger'
          })
        }
      }
    }, 1000)
  },
  computed: {
    coupons() {
      return this.$store.getters['Coupon/couponsData']
    },
    today() {
      return Math.round(new Date().getTime() / 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.coupon {
  width: 430px;
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

  &-bg.gray {
    background: radial-gradient(transparent 0, transparent 5px, #adb5bd 5px);
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

  &-bg.gray:before {
    background-color: #ccc;
  }

  &-btn {
    margin-right: -25px;
  }
}
</style>
