<template>
  <div class="container">
    <div class="row">
      <ul class="progress_nav my-3" ref="progressNav">
        <a
          v-if="switchNode"
          href="javascript:;"
          class="step active"
          @click="goCart"
          >購物車</a
        >
        <li v-else class="step active">購物車</li>
        <li class="step">填寫資料</li>
        <li class="step">提交訂單</li>
      </ul>
    </div>

    <router-view @setProgress="handProgressNav"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchNode: false
    }
  },
  methods: {
    handProgressNav(num) {
      this.switchNode = true
      this.$refs.progressNav.children[num].classList.add('active')
    },
    goCart() {
      this.$router.push('/cart')
    }
  },
  watch: {
    $route(to) {
      if (to.href === '/cart') {
        this.switchNode = false
        for (let i = 1; i < 3; i++) {
          this.$refs.progressNav.children[i].className = 'step'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';

.progress_nav {
  text-align: center;
  counter-reset: step;

  .step {
    display: inline-block;
    max-width: 33%;
    width: 240px;
    color: #333;
    text-transform: uppercase;
    font-size: 1.2rem;
    position: relative;
  }

  .step:before {
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

  .step:after {
    content: '';
    width: 100%;
    height: 2px;
    background: #fff;
    position: absolute;
    left: -50%;
    top: 25%;
    z-index: -1;
  }

  .step:first-child:after {
    content: none;
  }

  .step.active:before,
  .step.active:after {
    background: var(--primary);
    color: white;
  }
}
</style>
