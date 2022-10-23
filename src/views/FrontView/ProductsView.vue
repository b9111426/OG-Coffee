<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-12 py-2">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button class="btn btn-primary" type="button" id="button-addon2">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div class="col-lg-9 col-12 py-2">
        <!--麵包屑-->
        <div class="row row-cols-1 mb-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/products">全部商品</router-link>
              </li>
              <li class="breadcrumb-item">{{ breadcrumb }}</li>
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
    return {}
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  methods: {
    toggleLoading(boolean) {
      this.isLoading = boolean
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['Products/loadingState']
    },
    breadcrumb() {
      return this.$store.getters['Products/breadcrumb']
    }
  }
}
</script>

<style lang="scss"></style>
