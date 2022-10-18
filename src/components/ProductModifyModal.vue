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
                  <div class="col-6 border-end">
                    <div class="mb-3">
                      <label for="imageUrl" class="h6 form-label mb-2"
                        >輸入圖片網址:</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        ref="fileUrl"
                      />
                    </div>
                    <div class="mb-5">
                      <label for="customFile" class="h6 form-label mb-2"
                        >或上傳圖片取得圖片連結:
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
                      class="btn btn-primary btn-sm d-block w-100"
                      @click="addPic"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div class="col-6">
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
                  <label for="title" class="form-label">標題</label>
                  <input
                    id="title"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      id="category"
                      type="text"
                      class="form-control"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      id="unit"
                      type="text"
                      class="form-control"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      class="form-control"
                      v-model.number="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      class="form-control"
                      v-model.number="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
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
                  <label for="content" class="form-label">說明內容</label>
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
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
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
            確認
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
  data() {
    return {
      status: {},
      tempProduct: {
        imageUrl: []
      }
    }
  },
  emits: ['update-product'],
  mixins: [modalMixin],
  inject: ['emitter'],
  watch: {
    product() {
      this.tempProduct = this.product
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = []
      }
    }
  },
  methods: {
    async uploadFile() {
      try {
        const uploadedFile = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', uploadedFile)
        const res = await this.$store.dispatch('Products/upLoadFile', formData)
        this.$refs.fileUrl.value = res.data.imageUrl
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
    }
  }
}
</script>
