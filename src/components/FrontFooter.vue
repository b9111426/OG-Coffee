<template>
  <div id="footer" class="bg-tertiary py-4">
    <div class="container">
      <div class="row row-cols-lg-3 row-cols-1 gx-4 mb-3">
        <div class="col">
          <router-link to="/">
            <img
              class="footer-logo"
              src="@/assets/images/OG-Coffee-Dark.svg"
              alt=""
            />
          </router-link>
        </div>
        <div class="col">
          <h4 class="text-start mb-2">快速連結</h4>
          <ul class="text-start">
            <li>
              <router-link to="/products">所有商品</router-link>
            </li>
            <li>
              <router-link to="/coupon">取得優惠卷</router-link>
            </li>
            <li>
              <router-link to="/about">橘子專欄</router-link>
            </li>
            <li>
              <router-link to="/quest">常見問題</router-link>
            </li>
          </ul>
        </div>
        <div class="col">
          <h4 class="text-start mb-2">聯絡我們</h4>
          <ul>
            <li class="text-start py-lg-1 py-0">
              地址: <span class="ms-2">台北市中正區紹興南街34號</span>
            </li>
            <li class="text-start py-lg-1 py-0">
              網址: <span class="ms-2">bqsqbvyrap@iubridge.com</span>
            </li>
            <li class="text-start py-lg-1 py-0">
              電話: <span class="ms-2">0929822687</span>
            </li>
            <li class="text-start py-lg-1 py-0">
              ( 每週週一~到週五 07:30-12:30, 13:30-17:00 )
            </li>
            <li class="text-start py-lg-1 py-0">
              <a href="javascript:;" class="mx-1">
                <img class="icon" src="@/assets/images/facebook.png" alt="" />
                Facebook </a
              >|
              <a href="javascript:;" class="mx-1">
                <img class="icon" src="@/assets/images/instagram.png" alt="" />
                IG </a
              >|
              <a href="javascript:;" class="mx-1">
                <img class="icon" src="@/assets/images/line.png" alt="" />
                Line
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="d-none d-lg-block">
        此網站僅作為個人前端side project，不做商業用途，請勿用於商業用途，謝謝!
      </p>
      <p class="fs-7 d-lg-none d-block">
        此網站僅作為個人前端side project，不做商業用途，請勿用於商業用途，謝謝!
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.footer-logo {
  width: 200px;
  height: 200px;
  @include pad() {
    width: 100px;
    height: 100px;
  }
}
.icon {
  height: 25px;
  width: 25px;
}
</style>
