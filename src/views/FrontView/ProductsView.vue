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
        <div class="d-none d-lg-block">
          <p class="border-bottom py-2 border-gray-dark">分類</p>
          <div class="p-3" v-for="(i, idx) in category" :key="idx + 5678">
            <a
              class="collapsed fw-bold"
              data-bs-toggle="collapse"
              :href="`#collapse${idx}`"
            >
              <div class="d-flex justify-content-between">
                <span>{{ i.category }}</span>
                <span>{{ i.num }}</span>
                <i class="bi bi-caret-left-fill"></i>
              </div>
            </a>
            <div
              v-for="x in i.sub_category"
              :key="x"
              class="collapse text-start text-primary"
              :id="`collapse${idx}`"
            >
              <a href="#" class="d-flex justify-content-between ms-2">
                <span>{{ x.category }}</span>
                <span>{{ x.num }}</span>
              </a>
            </div>
          </div>
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
          <!--loading icon-->
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
    this.getAllProducts()
    this.$store.dispatch('handLoading', true)
  },
  methods: {
    toggleLoading(boolean) {
      this.isLoading = boolean
    },
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getFrontAllProduct')
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    }
  },
  computed: {
    allProduct() {
      return this.$store.getters['Products/allProductsData']
    },
    isLoading() {
      return this.$store.getters['Products/loadingState']
    },
    breadcrumb() {
      return this.$store.getters['Products/breadcrumb']
    },
    category() {
      return this.$store.getters['Products/category']
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 90px;
  height: 80px;
}
.bi-caret-left-fill {
  transform: rotate(-90deg);
  transition: transform 0.3s;
}
.collapsed {
  .bi-caret-left-fill {
    transform: rotate(0deg);
  }
}
</style>
