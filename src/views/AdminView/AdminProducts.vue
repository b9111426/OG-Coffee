<template>
  <h2>產品列表</h2>
  <div class="container text-start">
    <div class="row mt-4">
      <div class="col-12 col-lg-6 d-flex align-items-center">
        <div class="bg-white p-2 rounded text-dark position-relative">
          <strong>
            產品總數
            <span
              class="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle"
              >{{ allProductNum }}
            </span>
          </strong>
        </div>
        <div class="bg-white p-2 rounded text-dark position-relative ms-4">
          <strong>
            已啟用
            <span
              class="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle"
              >{{ allEnabled }}
            </span>
          </strong>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-flex">
        <button
          class="ms-auto btn btn-primary"
          type="button"
          @click="openModal(true)"
        >
          建立新的產品
        </button>
      </div>
    </div>

    <div class="card overflow-auto flex-nowrap mt-3 px-3">
      <table class="table mt-4 table-hover">
        <thead>
          <tr class="table-light">
            <th width="120">分類</th>
            <th width="150" class="text-center text-nowrap px-5">預覽</th>
            <th>產品名稱</th>
            <th width="120" class="text-end d-none d-lg-table-cell">原價</th>
            <th width="120" class="text-end text-nowrap px-4">售價</th>
            <th width="145" class="text-center d-none d-lg-table-cell">
              是否啟用
            </th>
            <th width="160" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item.id">
          <tr class="align-middle">
            <td>{{ item.category }}</td>
            <td class="text-center">
              <img
                class="pre-pic img-thumbnail"
                :src="item.imageUrl[0]"
                alt="縮圖"
              />
            </td>
            <td>{{ item.title }}</td>
            <td class="text-end d-none d-lg-table-cell">
              {{ item.origin_price }}
            </td>
            <td class="text-lg-end text-center">{{ item.price }}</td>
            <td class="d-none d-lg-table-cell">
              <div class="container ps-4">
                <div class="form-check d-flex justify-content-start">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    :id="item.id"
                    v-model="item.is_enabled"
                    @change="updateProduct({ product: item, isNew: false })"
                  />
                  <label
                    class="form-check-label"
                    :for="`flexSwitchCheckDefault${item.id}`"
                  >
                    <span v-if="item.is_enabled" class="text-primary"
                      >啟用</span
                    >
                    <span v-else class="text-gray-dark">未啟用</span>
                  </label>
                </div>
              </div>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="openModal(false, item)"
                >
                  <span class="d-lg-block d-none">編輯</span>
                  <i class="bi bi-pencil-square d-lg-none"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="openDelModal(item)"
                >
                  <span class="d-lg-block d-none">刪除</span>
                  <i class="bi bi-x-lg d-lg-none"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="products.length === 0" class="text-center">
          <td colspan="7" class="fs-3 text-gray py-4">產品列表已空</td>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 分頁 -->
  <Pagination
    class="mt-3"
    :pages="pagination"
    @emit-pages="getProducts"
  ></Pagination>

  <!-- 刪除產品 -->
  <DelModal
    :item="tempProduct"
    ref="delModal"
    @del-item="delProduct"
  ></DelModal>

  <!-- 新增、編輯產品 -->
  <ProductModifyModal
    @update-product="updateProduct"
    :product="tempProduct"
    :isNew="isNew"
    ref="productModal"
  ></ProductModifyModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import DelModal from '@/components/DelModal.vue'
import ProductModifyModal from '@/components/ProductModifyModal.vue'

export default {
  data() {
    return {
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    ProductModifyModal
  },
  methods: {
    openDelModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    openModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...product }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    async getProducts(page = 1) {
      try {
        await this.$store.dispatch('Products/getProducts', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getAllProducts')
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateProduct({ product, isNew }) {
      const productComponent = this.$refs.productModal
      this.tempProduct = product
      this.isNew = isNew
      try {
        let res = null
        if (!this.isNew) {
          const data = { id: this.tempProduct.id, product: this.tempProduct }
          res = await this.$store.dispatch('Products/modifyProduct', data)
        } else {
          res = await this.$store.dispatch(
            'Products/addProduct',
            this.tempProduct
          )
        }

        productComponent.hideModal()
        this.getAllProducts()
        this.$store.dispatch('fireToast', { res })
        this.getProducts(this.currentPage)
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    },

    async delProduct(title) {
      try {
        await this.$store.dispatch('Products/delProduct', this.tempProduct.id)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$store.dispatch('fireToast', {
          title: `${title}產品已刪除`,
          style: 'success'
        })
        this.getProducts(this.currentPage)
        this.getAllProducts()
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }
  },
  mounted() {
    this.getProducts()
    this.getAllProducts()
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    },
    pagination() {
      return this.$store.getters['Products/productsPage']
    },
    allProductNum() {
      return this.$store.getters['Products/allProductNum']
    },
    allEnabled() {
      return this.$store.getters['Products/allEnabled']
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-pic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}
</style>
