<template>
  <FrontNavbar></FrontNavbar>
  <div class="box">
    <router-view class="content"></router-view>
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
  height: calc(100vh - 89px);
  overflow: auto;
  @include pad() {
    min-height: calc(100vh - 65px);
  }
}
.content {
  min-height: calc(100vh - 89px - 122px);
  @include pad() {
    min-height: calc(100vh - 65px - 122px);
  }
}
</style>
