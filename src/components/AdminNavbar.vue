<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand px-3 brand-hover" to="/"
        >回前台</router-link
      >
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav d-lg-flex d-none flex-row mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link px-2" to="/admin/product"
            >產品列表</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-2" to="/admin/order"
            >後台訂單</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-2" to="/admin/coupon"
            >優惠卷</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-2" to="/admin/article"
            >貼文</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-2" to="/admin/cart"
            >購物車</router-link
          >
        </li>
      </ul>
      <a
        href="#"
        type="button"
        class="btn btn-outline-secondary ms-auto d-none d-lg-inline-block"
        @click.prevent="logout"
        >登出</a
      >
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header bg-dark">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button
            type="button"
            class="btn-close text-reset bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body bg-dark">
          <ul class="navbar-nav d-flex mb-2 mb-lg-0">
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link class="nav-link brand-hover" to="/admin/product"
                >產品列表</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link class="nav-link brand-hover" to="/admin/order"
                >後台訂單</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link class="nav-link brand-hover" to="/admin/coupon"
                >優惠卷</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link class="nav-link brand-hover" to="/admin/article"
                >貼文</router-link
              >
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link class="nav-link brand-hover" to="/admin/cart"
                >購物車</router-link
              >
            </li>
          </ul>
          <a
            href="#"
            type="button"
            class="btn btn-outline-secondary ms-auto"
            @click.prevent="logout"
            >登出</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { apiSignOutRequest } from '@/api'
export default {
  methods: {
    async logout() {
      try {
        const res = await apiSignOutRequest()
        this.$store.dispatch('fireToast', { res })
        if (res.data.success) {
          this.$router.push('/')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.brand-hover {
  transition: all 0.3s ease-in-out;
}
.brand-hover:hover {
  background-color: var(--secondary);
  border-radius: 5px;
  color: black;
}
</style>
