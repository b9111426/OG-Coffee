<template>
  <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container pt-4 position-relative">
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
              <span
                class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
              >
                0
              </span>
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link
              type="button"
              class="btn btn-outline-primary btn-sm"
              to="/about"
            >
              <i class="bi bi-chat-fill"></i>
              聯絡我們</router-link
            >
          </li>
          <li class="nav-item mx-1">
            <router-link
              type="button"
              class="btn btn-outline-primary btn-sm"
              to="/newer"
            >
              <i class="bi bi-search"></i>
              找產品</router-link
            >
          </li>
        </ul>
      </div>
      <router-link
        class="navbar-brand frontNavbar-logo"
        style="line-height: 1"
        title="橘子咖啡"
        to="/"
        >橘子咖啡</router-link
      >
      <div class="navBottom me-auto">
        <ul class="navbar-nav d-lg-flex d-none flex-row mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/products"
              >所有商品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/coupon"
              >取得優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/about"
              >橘子專欄</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/quest"
              >常見問題</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-2" to="/newer"
              >新手專區</router-link
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
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header position-relative">
          <router-link
            class="navbar-brand frontNavbar-logo m-auto"
            style="line-height: 1"
            title="橘子咖啡"
            to="/"
            data-bs-dismiss="offcanvas"
            >橘子咖啡</router-link
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
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/products"
                  >所有商品</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/coupon"
                  >取得優惠卷</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/about"
                  >關於橘子</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/quest"
                  >常見問題</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/newer"
                  >新手專區</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/admin">
                  登入後台</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/cart">
                  購物車
                </router-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/about">
                  聯絡我們</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link px-2" to="/newer">
                  找產品</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
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
  }
}
.frontNavbar-logo {
  background: url('~@/assets/images/OG-Coffee.svg') no-repeat center center/
    100% 100%;
  width: 100px;
  height: 48px;
  position: relative;
  @include hide-text;
  &:active,
  &:hover {
    -webkit-animation: jello-horizontal 0.4s both ease-in-out;
    animation: jello-horizontal 0.4s both ease-in-out;
  }
}
</style>
