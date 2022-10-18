<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">回前台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order"
              >後台訂單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon"
              >優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/article">貼文</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <a
              href="#"
              type="button"
              class="btn btn-outline-secondary"
              @click.prevent="logout"
              >登出</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { apiSignInRequest } from '@/api'
export default {
  inject: ['emitter'],
  methods: {
    async logout() {
      try {
        const res = await apiSignInRequest()
        this.$store.dispatch('fireToast', { res })
        //this.$httpMessageState(response, '登出')
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
