<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-3 col-12 py-2">
        <!--收尋功能-->
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

        <!--分類篩選-->
        <div class="d-none d-lg-block">
          <p
            class="border-bottom py-2 border-gray-dark position-relative select-none"
          >
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
          <div class="p-3" v-for="(i, idx) in categoryList" :key="idx + 5678">
            <a
              class="collapsed fw-bold select-none"
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
                class="d-flex justify-content-between ms-2 select-none"
                @click="renderSubCategory($event)"
                :data-sub_category="x.category"
                :data-category="i.category"
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
            <option
              :value="i.category"
              v-for="(i, idx) in categoryList"
              :key="idx + 5678"
            >
              {{ i.category }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-lg-9 col-12 py-2">
        <div class="d-flex align-items-center justify-content-start mb-3">
          <!--麵包屑-->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb select-none" ref="breadcrumb">
              <li class="breadcrumb-item">
                <a href="javascript:;" @click="setAllProducts"> 全部商品 </a>
              </li>
              <li v-if="breadcrumb.length === 0" class="breadcrumb-item"></li>
              <li v-else-if="breadcrumb.length === 1" class="breadcrumb-item">
                {{ breadcrumb[0] }}
              </li>
              <template v-else>
                <li class="breadcrumb-item">
                  <a
                    href="javascript:;"
                    @click="renderCategory($event)"
                    :data-category="breadcrumb[0]"
                    >{{ breadcrumb[0] }}</a
                  >
                </li>
                <li class="breadcrumb-item">
                  {{ breadcrumb[1] }}
                </li>
              </template>
            </ol>
          </nav>

          <!--排序功能-->
          <a
            v-show="sortState"
            href="javascript:;"
            class="ms-5 link-dark border-bottom border-primary ms-auto"
            @click="switchSort"
          >
            <span v-show="!sortRise" class="text-primary select-none"
              >價格由高至低<i class="bi bi-chevron-down ps-1"></i
            ></span>
            <span v-show="sortRise" class="text-primary select-none"
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
      searchName: '',
      breadcrumb: []
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
        const firstCategory = this.categoryList[0].category
        this.getProducts(1, firstCategory)
        this.breadcrumb.push(firstCategory)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    renderCategory(e) {
      const category = e.currentTarget.dataset.category
      this.breadcrumb = []
      this.breadcrumb.push(category)
      this.$store.dispatch('Products/setTempProduct', category)
      this.getProducts(1, category)
      this.$store.dispatch('Products/setSortState', true)
    },
    selectCategory(e) {
      const category = e.target.value
      this.breadcrumb = []
      this.breadcrumb.push(category)
      this.$store.dispatch('Products/setTempProduct', category)
      this.getProducts(1, category)
      this.$store.dispatch('Products/setSortState', true)
    },
    searchProduct() {
      if (this.searchName.trim() === '') {
        return
      }
      this.$store.dispatch('Products/searchProduct', this.searchName)
      this.$router.push('/products')
      this.searchName = ''
      this.breadcrumb = []
    },
    setAllProducts: _.debounce(function () {
      this.breadcrumb = []
      this.getProducts()
      this.$store.dispatch('Products/setSortState', true)
    }, 500),
    renderSubCategory(e) {
      const subCategory = e.currentTarget.dataset.sub_category
      const category = e.currentTarget.dataset.category
      this.breadcrumb = [category, subCategory]
      this.$store.dispatch('Products/searchSubCategory', subCategory)
      this.$router.push('/products')
      this.$store.dispatch('Products/setSortState', true)
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
    categoryList() {
      return this.$store.getters['Products/category']
    },
    sortState() {
      return this.$store.getters['Products/sortState']
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
