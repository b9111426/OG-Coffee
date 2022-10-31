<template>
  <FrontNavbar></FrontNavbar>
  <div class="box">
    <router-view></router-view>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
  },
  created() {
    this.$store.dispatch('handLoading', true)
  }
}
</script>
<style long="scss" scoped>
.box {
  height: calc(100vh - 89px);
  overflow: auto;
}
</style>
