<template>
  <FrontNavbar></FrontNavbar>
  <div class="box">
    <div class="content">
      <router-view></router-view>
    </div>
    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  components: {
    FrontNavbar,
    FrontFooter
  },
  created() {
    this.$store.dispatch('handLoading', true)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.box {
  height: calc(100vh - var(--header-h));
  overflow: auto;
  @include pad() {
    min-height: calc(100vh - var(--header-s-h));
  }
}
.content {
  min-height: calc(100vh - var(--header-h) - var(--footer-h));
  @include pad() {
    min-height: calc(100vh - var(--header-s-h) - var(--footer-h));
  }
}
</style>
