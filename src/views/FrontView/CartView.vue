<template>
  <div class="container">
    <div class="row">
      <div class="progressBox mt-3">
        <ul id="progressbar">
          <li class="active">購物車</li>
          <li>填寫資料</li>
          <li>提交訂單</li>
        </ul>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script></script>
<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
#progressbar {
  overflow: hidden;
  counter-reset: step;
}

#progressbar li {
  list-style-type: none;
  color: #333;
  text-transform: uppercase;
  font-size: 1.2rem;
  width: 33.33333%;
  float: left;

  position: relative;
}

#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 20px;
  line-height: 20px;
  display: block;
  font-size: 1rem;
  color: #333;
  background: #fff;
  border-radius: 3px;
  padding: 10px 30px 10px 20px;
  margin: 0 auto 5px auto;
  @include pad() {
    line-height: 10px;
    padding: 10px 20px 10px 10px;
  }
}

#progressbar li:after {
  content: '';
  width: 100%;
  height: 2px;
  background: #fff;
  position: absolute;
  left: -50%;
  top: 25%;
  z-index: -1;
}

#progressbar li:first-child:after {
  content: none;
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: var(--primary);
  color: white;
}

.progressBox {
  padding: 20px;
  margin: 0 auto;
  width: 50%;
  @include pad() {
    width: 100%;
  }
}
</style>
