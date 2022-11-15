<template>
  <FrontNavbar></FrontNavbar>
  <div class="box" ref="box">
    <div class="content">
      <router-view></router-view>
    </div>
    <FrontFooter></FrontFooter>
  </div>
  <UpBtn :active="active" @up-to-top="moveTop"></UpBtn>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import UpBtn from '@/components/UpBtn.vue'
export default {
  components: {
    FrontNavbar,
    FrontFooter,
    UpBtn
  },
  data() {
    return {
      active: false
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getAllProducts()
  },
  mounted() {
    const box = this.$refs.box
    const reactHeight = box.scrollTop + box.getBoundingClientRect().bottom
    box.onscroll = () => {
      if (
        reactHeight > box.scrollHeight / 2 &&
        reactHeight > window.screen.height * 1.3
      ) {
        this.active = true
      } else {
        this.active = false
      }
    }
  },
  methods: {
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getFrontAllProduct')
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    moveTop() {
      this.$refs.box.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
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
