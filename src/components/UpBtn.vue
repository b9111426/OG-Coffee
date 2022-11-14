<template>
  <div
    :class="{ 'd-none': !active }"
    class="upBtn d-flex align-items-center justify-content-center shadow"
    @click="$emit('upToTop')"
  >
    <i class="bi bi-chevron-bar-up fs-1 text-white"></i>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>

<style lang="scss" scoped>
.upBtn {
  width: 70px;
  height: 70px;
  background-color: adjust-hue(#a2997f, -15%);
  border-radius: 10px;
  position: fixed;
  right: 50px;
  bottom: 150px;
  z-index: 600;
  cursor: pointer;
}
</style>
