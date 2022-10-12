<template>
  <h2>產品列表</h2>
  <div class="container text-start">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <div class="card mt-3 px-3">
      <table class="table mt-4 table-hover">
        <thead>
          <tr class="table-light">
            <th width="120">分類</th>
            <th width="150" class="text-center">預覽</th>
            <th>產品名稱</th>
            <th width="120" class="text-end">原價</th>
            <th width="120" class="text-end">售價</th>
            <th width="145" class="text-center">是否啟用</th>
            <th width="160" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item.id">
          <tr>
            <td>{{ item.category }}</td>
            <td class="text-center">
              <img
                class="pre-pic img-thumbnail"
                :src="item.imageUrl"
                alt="縮圖"
              />
            </td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <div class="container ps-4">
                <div class="form-check d-flex justify-content-start">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    :id="item.id"
                    v-model="item.is_enabled"
                    @change="updateProduct(item, item.id)"
                  />
                  <label
                    class="form-check-label"
                    :for="`flexSwitchCheckDefault${item.id}`"
                  >
                    <span v-if="item.is_enabled" class="text-primary"
                      >啟用</span
                    >
                    <span v-else class="text-secondary">未啟用</span>
                  </label>
                </div>
              </div>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal(false, item)"
                >
                  查看細節
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 分頁 -->
  <Pagination
    class="mt-4"
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
  inject: ['emitter'],
  data() {
    return {
      products: [],
      isNew: false,
      pagination: {},
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
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
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
    updateProduct(product) {
      this.emitter.emit('loading')
      this.tempProduct = product
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          productComponent.hideModal()
          this.$httpMessageState(res, '更新付款狀態')
          this.getProducts(this.currentPage)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    openDelModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((res) => {
          const delComponent = this.$refs.delModal
          this.emitter.emit('loading')
          delComponent.hideModal()
          this.$httpMessageState(res, res.data.message)
          this.getProducts(this.currentPage)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    }
  },
  mounted() {
    this.getProducts()
  },
  beforeCreated() {
    this.emitter.emit('loading')
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
