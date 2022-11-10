<template>
  <AdminNavbar></AdminNavbar>
  <div class="box">
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import { apiCheckRequest } from '@/api'
export default {
  data() {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.checkLogin()
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
