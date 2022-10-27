<template>
  <div
    id="productModal"
    ref="modal"
    class="modal scale-in-center"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable text-start"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close bg-gray me-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-5">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                圖片添加
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                基本資料
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <!--圖片添加-->
              <div class="mt-3">
                <div class="row">
                  <div class="col-lg-6 col-12 pb-3 pb-lg-0 border-set">
                    <div class="mb-3">
                      <label for="imageUrl" class="fw-bold form-label mb-2"
                        >輸入圖片網址</label
                      >
                      <div v-if="isLoading" class="ms-3 d-inline-block">
                        <img
                          class="loading"
                          src="@/assets/images/load.gif"
                          alt=""
                        />
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        @input="btnShow"
                        ref="fileUrl"
                      />
                    </div>
                    <div class="mb-5">
                      <label for="customFile" class="fw-bold form-label mb-2"
                        >或上傳圖片取得圖片連結
                      </label>
                      <input
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="fileInput"
                        @change="uploadFile"
                      />
                    </div>

                    <button
                      v-if="isBtnShow"
                      class="btn btn-primary btn-sm d-block w-100"
                      @click="addPic"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div class="col-lg-6 col-12 mt-3 mt-lg-0">
                    <div
                      class="mb-4"
                      v-for="(item, key) in tempProduct.imageUrl"
                      :key="key + '21345'"
                    >
                      <h6 class="mb-1">圖片{{ key + 1 }}</h6>
                      <div class="position-relative">
                        <img
                          class="img-fluid img-thumbnail"
                          :src="item"
                          alt=""
                        />
                        <button
                          type="button"
                          :data-idx="key"
                          class="btn-close bg-white p-2 position-absolute top-0 start-0 mt-3 ms-3"
                          aria-label="Close"
                          @click="removePic($event)"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <!--基本資料-->
              <div class="mt-3">
                <div class="mb-3">
                  <label for="title" class="form-label fw-bold">標題</label>
                  <input
                    id="title"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="mb-3">
                  <label for="subtitle" class="form-label fw-bold"
                    >副標題</label
                  >
                  <input
                    id="subtitle"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.subtitle"
                    placeholder="請輸入副標題"
                  />
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label fw-bold"
                      >分類</label
                    >
                    <select
                      id="category"
                      class="form-select"
                      v-model="tempProduct.category"
                      @change="handTempProduct"
                      aria-label="category select"
                    >
                      <option value="飲品">飲品</option>
                      <option value="蛋糕">蛋糕</option>
                      <option value="餐點">餐點</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label fw-bold">單位</label>
                    <p>{{ unitSet }}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label fw-bold"
                      >原價</label
                    >
                    <input
                      id="price"
                      type="number"
                      min="0"
                      class="form-control"
                      @input="handTempProduct"
                      v-model.number="tempProduct.origin_price"
                      placeholder="請輸入售價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label fw-bold">售價</label>

                    <p>{{ price || 0 }}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="discount" class="form-label fw-bold"
                      >折扣</label
                    >
                    <select
                      id="discount"
                      class="form-select"
                      v-model.number="tempProduct.discount"
                      @change="handTempProduct"
                      aria-label="category select"
                    >
                      <option value="1">原價</option>
                      <option value="0.9">九折</option>
                      <option value="0.8">八折</option>
                      <option value="0.7">七折</option>
                      <option value="0.6">六折</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label fw-bold"
                    >產品描述</label
                  >
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label fw-bold"
                    >說明內容</label
                  >
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.content"
                    placeholder="請輸入說明內容"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      v-model="tempProduct.is_enabled"
                      type="checkbox"
                      :true-value="true"
                      :false-value="false"
                    />
                    <label class="form-check-label fw-bold" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      v-model="tempProduct.is_soldOut"
                      type="checkbox"
                      :true-value="true"
                      :false-value="false"
                    />
                    <label class="form-check-label fw-bold" for="is_enabled"
                      >售完</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', { product: tempProduct, isNew })"
          >
            {{ isNew ? '新增產品' : '更新產品' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: ['product', 'isNew'],
  emits: ['update-product'],
  data() {
    return {
      status: {},
      tempProduct: {
        imageUrl: []
      },
      isBtnShow: false,
      isLoading: false
    }
  },
  mixins: [modalMixin],
  watch: {
    product() {
      this.tempProduct = this.product
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = []
      }
    }
  },
  methods: {
    btnShow() {
      if (this.$refs.fileUrl.value) {
        this.isBtnShow = true
      } else {
        this.isBtnShow = false
      }
    },
    async uploadFile() {
      try {
        this.isLoading = true
        const uploadedFile = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', uploadedFile)
        const res = await this.$store.dispatch('Products/upLoadFile', formData)
        this.$refs.fileUrl.value = res.data.imageUrl
        this.isBtnShow = true
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    },
    addPic() {
      const url = this.$refs.fileUrl.value
      if (!url) {
        return
      }
      this.tempProduct.imageUrl.push(url)
      this.$refs.fileUrl.value = null
      this.$refs.fileInput.value = null
    },
    removePic(e) {
      const idx = e.target.getAttribute('data-idx')
      this.tempProduct.imageUrl.splice(idx, 1)
    },
    handTempProduct() {
      this.tempProduct.unit = this.unitSet
      this.tempProduct.price = this.price
    }
  },
  computed: {
    unitSet() {
      let unit = null
      switch (this.tempProduct.category) {
        case '飲品':
          unit = '杯'
          break
        case '蛋糕':
          unit = '個'
          break
        case '餐點':
          unit = '份'
          break
      }
      return unit
    },
    price() {
      return Math.floor(
        this.tempProduct.origin_price * this.tempProduct.discount
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.border-set {
  @include pad() {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
  border-right: 1px solid #ddd;
}
.loading {
  width: 30px;
  height: 25px;
}
</style>
