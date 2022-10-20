<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-12 bg-danger py-2"></div>
      <div class="col-lg-9 col-12 py-2">
        <!--麵包屑-->
        <div class="row row-cols-1 mb-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/products">全部商品</router-link>
              </li>
              <li class="breadcrumb-item"></li>
            </ol>
          </nav>
        </div>

        <div class="row row-cols-1 position-relative">
          <div
            v-if="isLoading"
            class="position-absolute top-50 start-50 translate-middle my-5"
          >
            <img class="loading" src="@/assets/images/load.gif" alt="" />
          </div>

          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  methods: {
    toggleLoading(boolean) {
      this.isLoading = boolean
    }
  }
}
</script>

<style lang="scss"></style>
