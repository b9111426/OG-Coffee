<template>
  <h2>優惠卷頁面</h2>
  <div class="container">
    <div class="coupon"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.coupon {
  position: relative;
  width: 12px;
  height: 125px;
  background: radial-gradient(
    transparent 0,
    transparent 5px,
    var(--primary) 5px
  );
  background-size: 15px 15px;
  background-position: 11px 3px;
  color: #fff;
}

.coupon:before {
  position: absolute;
  left: 10px;
  bottom: 0;
  content: '';
  width: 400px;
  height: 125px;
  z-index: -1;
  background-color: var(--primary);
  border-radius: 0 10px 10px 0;
}
</style>
