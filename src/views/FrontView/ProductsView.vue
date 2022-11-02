<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-12 py-2">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="searchName"
            @keyup.enter="searchProduct"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-primary"
            type="button"
            id="button-addon2"
            @click="searchProduct"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div class="d-none d-lg-block">
          <p class="border-bottom py-2 border-gray-dark position-relative">
            分類
            <span>
              <img
                v-if="isLoading2"
                class="loading2 position-absolute end-0 top-50 me-5 translate-middle"
                src="@/assets/images/load.gif"
                alt=""
              />
            </span>
          </p>
          <div class="p-3" v-for="(i, idx) in category" :key="idx + 5678">
            <a
              class="collapsed fw-bold"
              data-bs-toggle="collapse"
              :href="`#collapse${idx}`"
            >
              <div
                class="d-flex justify-content-between bg-gray"
                @click="renderCategory($event)"
                :data-category="i.category"
              >
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
              <a
                href="#"
                class="d-flex justify-content-between ms-2"
                @click="renderSubCategory($event)"
                :data-category="x.category"
              >
                <span>{{ x.category }}</span>
                <span>{{ x.num }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="d-lg-none d-block">
          <select
            class="form-select"
            @change="selectCategory($event)"
            aria-label="select category"
          >
            <option value="" selected disabled>商品分類</option>
            <option
              :value="i.category"
              v-for="(i, idx) in category"
              :key="idx + 5678"
            >
              {{ i.category }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-lg-9 col-12 py-2">
        <!--麵包屑-->
        <div class="d-flex align-items-center justify-content-start mb-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb" ref="breadcrumb">
              <li class="breadcrumb-item">
                <a href="javascript:;" @click="setAllProducts"> 全部商品 </a>
              </li>
              <li class="breadcrumb-item gray-dark">{{ breadcrumb }}</li>
            </ol>
          </nav>
          <a
            href="javascript:;"
            class="ms-5 link-dark border-bottom border-primary ms-auto"
            @click="switchSort"
          >
            <span v-show="!sortRise" class="text-primary"
              >價格由高至低<i class="bi bi-chevron-down ps-1"></i
            ></span>
            <span v-show="sortRise" class="text-primary"
              >價格由低至高<i class="bi bi-chevron-up ps-1"></i
            ></span>
          </a>
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
import _ from 'lodash'
export default {
  data() {
    return {
      isLoading2: false,
      sortRise: false,
      searchName: ''
    }
  },
  created() {
    this.getAllProducts()
    this.$store.dispatch('handLoading', true)
  },
  methods: {
    toggleLoading(boolean) {
      this.isLoading = boolean
    },
    getProducts: _.debounce(async function (page = 1, category) {
      try {
        this.isLoading2 = true
        const data = { page, category }
        await this.$store.dispatch('Products/getFrontProducts', data)
        this.$store.dispatch('Products/setTempProduct', category)
        this.isLoading2 = false
        this.$store.dispatch('handLoading', false)
        this.$router.push('/products')
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    }, 500),
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getFrontAllProduct')
        this.getProducts(1, '飲品')
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    renderCategory(e) {
      const category = e.currentTarget.dataset.category
      this.$store.dispatch('Products/setBreadcrumb', category)
      this.$store.dispatch('Products/setTempProduct', category)
      this.getProducts(1, category)
    },
    selectCategory(e) {
      const category = e.target.value
      this.$store.dispatch('Products/setBreadcrumb', category)
      this.$store.dispatch('Products/setTempProduct', category)
      this.getProducts(1, category)
    },
    searchProduct() {
      if (this.searchName.trim() === '') {
        return
      }
      this.$store.dispatch('Products/searchProduct', this.searchName)
      this.$router.push('/products')
      this.searchName = ''
    },
    setAllProducts: _.debounce(function () {
      this.getProducts()
      this.$store.dispatch('Products/setBreadcrumb', '')
    }, 500),
    renderSubCategory(e) {
      const subCategory = e.currentTarget.dataset.category
      this.$store.dispatch('Products/searchSubCategory', subCategory)
      this.$store.dispatch('Products/setBreadcrumb', subCategory)
      this.$router.push('/products')
    },
    switchSort() {
      this.sortRise = !this.sortRise
      this.$store.dispatch('Products/switchSort', this.sortRise)
    }
  },
  computed: {
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
.loading2 {
  height: 40px;
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
