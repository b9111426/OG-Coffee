<template>
  <nav class="navbar navbar-light bg-light fixed-top border-bottom border-gray">
    <div class="container pt-lg-4 position-relative">
      <div class="navTop d-block flex-0 position-absolute top-0 end-0 mt-1">
        <ul class="navbar-nav d-lg-flex d-none flex-row mb-lg-0">
          <li class="nav-item mx-1">
            <router-link
              type="button"
              class="btn btn-outline-primary btn-sm"
              to="/admin"
            >
              <i class="bi bi-person-fill"></i>
              登入後台</router-link
            >
          </li>
          <li class="nav-item ms-1 me-2">
            <router-link
              type="button"
              class="btn btn-outline-primary btn-sm position-relative"
              to="/cart"
            >
              <i class="bi bi-cart-fill"></i>
              購物車
              <div
                v-if="cartQty"
                :class="{ shake: isShake }"
                class="cartBadge badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
              >
                <span
                  class="position-absolute top-50 start-50 translate-middle"
                  >{{ cartQty }}</span
                >
              </div>
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <a href="javascript:;" class="btn btn-outline-primary btn-sm"
              >聯絡我們
              <i class="bi bi-chat-text-fill"></i>
            </a>
          </li>
        </ul>
      </div>
      <ul class="d-flex d-lg-none me-auto">
        <li class="mx-1" title="登入後台">
          <router-link class="nav-link px-2" to="/admin">
            <i class="bi bi-person fs-2"></i>
          </router-link>
        </li>
        <li class="mx-1" title="購物車">
          <router-link class="position-relative" to="/cart">
            <i class="bi bi-cart2 fs-2"></i>
            <div
              v-if="cartQty"
              :class="{ shake: isShake }"
              class="cartBadge badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
            >
              <span
                class="position-absolute top-50 start-50 translate-middle"
                >{{ cartQty }}</span
              >
            </div>
          </router-link>
        </li>
      </ul>
      <router-link
        class="navbar-brand frontNavbar-logo"
        style="line-height: 1"
        title="橘子咖啡"
        to="/"
        >橘子咖啡</router-link
      >
      <div class="navBottom me-auto">
        <ul class="navbar-nav d-lg-flex d-none flex-row mb-lg-0">
          <li class="d-list nav-item position-relative">
            <a href="javascript:;" class="nav-link px-2" @click="toProduct"
              >所有商品 <i class="bi bi-caret-down-fill fs-7"></i
            ></a>
            <ul
              class="d-menu text-start position-absolute bg-white p-1 border shadow start-50"
            >
              <li v-for="(i, idx) in categoryList" :key="idx + 35343">
                <a
                  class="px-1 d-block text-nowrap"
                  href="javascript:;"
                  @click="selectList(i.category)"
                  >{{ i.category }}</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/coupon"
              >取得優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/article"
              >橘子專欄</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/quest"
              >常見問題</router-link
            >
          </li>
        </ul>
      </div>

      <!--offcanvas-->
      <button
        class="navbar-toggler d-lg-none"
        type="button "
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end bg-primary"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header position-relative">
          <router-link
            class="navbar-brand m-auto fw-bold"
            title="橘子咖啡"
            to="/"
            data-bs-dismiss="offcanvas"
            >OG Coffee</router-link
          >
          <button
            type="button"
            class="btn-close text-reset position-absolute end-0 me-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="navBottom">
            <ul class="navbar-nav">
              <li class="nav-item" @click="openMenu">
                <a href="javascript:;" class="nav-link px-2"
                  >商品列表
                  <i class="bi bi-caret-down-fill fs-7"></i>
                </a>
                <ul
                  class="s-menu text-center bg-primary p-1 border border-tertiary shadow start-50"
                >
                  <li>
                    <a
                      class="py-2 d-block"
                      href="javascript:;"
                      data-bs-dismiss="offcanvas"
                      @click="toProduct"
                      >所有商品</a
                    >
                  </li>
                  <li
                    data-bs-dismiss="offcanvas"
                    v-for="(i, idx) in categoryList"
                    :key="idx + 35343"
                  >
                    <a
                      class="px-2 d-block text-nowrap"
                      href="javascript:;"
                      @click="selectList(i.category)"
                      >{{ i.category }}</a
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/coupon"
                  >取得優惠卷</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/article"
                  >橘子專欄</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/quest"
                  >常見問題</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <a href="javascript:;" class="py-2 d-block">聯絡我們</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuShow: 'none'
    }
  },
  methods: {
    async getCart() {
      await this.$store.dispatch('Cart/getCart')
    },
    selectList(val) {
      this.$store.dispatch('Products/setFirstCategory', val)
      this.$store.dispatch('Products/setSortState', true)
      this.$router.push('/products')
    },
    async toProduct() {
      this.$store.dispatch('Products/setFirstCategory', '')
      this.$router.push('/products')
    },
    openMenu() {
      if (this.isMenuShow === 'none') {
        this.isMenuShow = 'block'
      } else {
        this.isMenuShow = 'none'
      }
    }
  },
  computed: {
    cartQty() {
      const cartData = this.$store.getters['Cart/getCart']
      let num = cartData.length
      if (num > 9) {
        num = '9+'
      }
      return num
    },
    isShake() {
      return this.$store.getters['Cart/isShake']
    },
    categoryList() {
      return this.$store.getters['Products/category']
    }
  },
  created() {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.navBottom .navbar-nav li > a {
  text-transform: capitalize;
  color: #333;
  transition: background-color 0.2s, color 0.2s;

  &:hover,
  &:focus {
    background-color: var(--primary);
    color: #fff;
    @include pad() {
      background-color: #555;
    }
  }
}
.frontNavbar-logo {
  background: url('~@/assets/images/OG-Coffee.svg') no-repeat center center/
    100% 100%;
  width: 100px;
  height: 48px;
  position: relative;
  @include hide-text;
  &:hover {
    -webkit-animation: jello-horizontal 0.4s both ease-in-out;
    animation: jello-horizontal 0.4s both ease-in-out;
  }

  &:active {
    filter: opacity(50%);
  }
}
.shake {
  top: -3px !important;
}
.cartBadge {
  height: 20px;
  width: 20px;
}

.d-list:hover .d-menu {
  display: block;
}

.d-menu {
  display: none;
  transform: translate(-50px, 0);
  min-width: 100px;
}

.s-menu {
  display: v-bind(isMenuShow);
}
</style>
