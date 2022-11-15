<template>
  <AdminNavbar></AdminNavbar>
  <div class="box" ref="box">
    <router-view v-if="checkSuccess"></router-view>
  </div>
  <UpBtn :active="active" @up-to-top="moveTop"></UpBtn>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import UpBtn from '@/components/UpBtn.vue'
import { apiCheckRequest } from '@/api'
export default {
  data() {
    return {
      checkSuccess: false,
      active: false
    }
  },
  components: {
    AdminNavbar,
    UpBtn
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.checkLogin()
  },
  mounted() {
    const box = this.$refs.box

    box.onscroll = () => {
      if (
        box.scrollTop + box.getBoundingClientRect().bottom >
          box.scrollHeight / 2 &&
        box.scrollTop + box.getBoundingClientRect().bottom >
          window.screen.height
      ) {
        this.active = true
      } else {
        this.active = false
      }
    }
  },
  methods: {
    async checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)ogCoffeeToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        try {
          await apiCheckRequest(token)
          this.checkSuccess = true
        } catch (err) {
          this.$store.dispatch('fireToast', { title: '請重新登入' })
          this.$store.dispatch('toPage', '/admin')
          this.$router.push('/login')
        }
      } else {
        this.$store.dispatch('toPage', '/admin')
        this.$store.dispatch('fireToast', { title: '請先登入' })
        this.$router.push('/login')
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
<style long="scss" scoped>
.box {
  height: calc(100vh - 59px);
  overflow: auto;
}
</style>
