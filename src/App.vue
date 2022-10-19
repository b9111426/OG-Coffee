<template>
  <CustomLoading></CustomLoading>
  <ToastMessages></ToastMessages>
  <router-view />
</template>

<script>
import emitter from '@/libs/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import CustomLoading from '@/components/CustomLoading.vue'
export default {
  components: { ToastMessages, CustomLoading },
  provide() {
    return {
      emitter
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/stylesheets/all.scss';

#app {
  text-align: center;
  color: $gray-800;
}
</style>
