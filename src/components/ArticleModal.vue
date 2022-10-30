<template>
  <div
    id="articleModal"
    ref="modal"
    class="modal scale-in-center"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable text-start"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h5>
          <button
            type="button"
            class="btn-close bg-gray me-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
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
                基本資料
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
                編輯文章
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
              <div class="container mt-3">
                <div class="mb-3">
                  <label for="title" class="form-label fw-bold">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempArticle.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6 col-12">
                    <label for="author" class="form-label fw-bold">作者</label>
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      v-model="tempArticle.author"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="mb-3 col-md-6 col-12">
                    <label for="create_at" class="form-label fw-bold"
                      >文章建立日期</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="create_at"
                      v-model="create_at"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6 col-12">
                    <label for="image" class="form-label fw-bold"
                      >輸入圖片網址</label
                    >
                    <input
                      type="text"
                      ref="fileUrl"
                      class="form-control"
                      id="image"
                      v-model="tempArticle.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                    <div class="mt-3">
                      <label for="customFile" class="fw-bold form-label mb-2"
                        >或上傳圖片取得圖片連結
                      </label>
                      <div v-if="isLoading" class="ms-3 d-inline-block">
                        <img
                          class="loading"
                          src="@/assets/images/load.gif"
                          alt=""
                        />
                      </div>

                      <input
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="fileInput"
                        @change="uploadFile"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div v-if="tempArticle.imageUrl" class="mb-4">
                      <div class="position-relative">
                        <img
                          class="img-fluid img-thumbnail"
                          :src="tempArticle.imageUrl"
                          alt=""
                        />
                        <button
                          type="button"
                          class="btn-close bg-white p-2 position-absolute top-0 start-0 mt-3 ms-3"
                          aria-label="Close"
                          @click="removePic"
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
              <div class="container mt-3">
                <label for="tag" class="form-label fw-bold">標籤</label>
                <div class="row gx-1 mb-3">
                  <div
                    class="col-md-2 mb-1"
                    v-for="(label, key) in tempArticle.tag"
                    :key="key"
                  >
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control form-control"
                        id="tag"
                        v-model="tempArticle.tag[key]"
                        placeholder="請輸入標籤"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="tempArticle.tag.splice(key, 1)"
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                  <div
                    class="col-md-2 mb-1"
                    v-if="
                      tempArticle.tag[tempArticle.tag.length - 1] ||
                      !tempArticle.tag.length
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempArticle.tag.push('')"
                    >
                      新增標籤
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label fw-bold"
                    >文章描述</label
                  >
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempArticle.description"
                    placeholder="請輸入文章描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="tempArticle.content"
                  ></ckeditor>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :true-value="true"
                      :false-value="false"
                      v-model="tempArticle.isPublic"
                      id="isPublic"
                    />
                    <label class="form-check-label fw-bold" for="isPublic">
                      是否公開
                    </label>
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
            @click="$emit('update-article', { article: tempArticle, isNew })"
          >
            {{ isNew ? '新增文章' : '更新文章' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import CK_plugin from '@/libs/CK_plugin'

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-article'],
  data() {
    return {
      status: {},
      tempArticle: {
        isPublic: false,
        imageUrl: '',
        create_at: 0,
        tag: ['']
      },
      isLoading: false,
      create_at: 0,
      editor: ClassicEditor,
      editorConfig: CK_plugin
    }
  },
  mixins: [modalMixin],
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false
      }
      ;[this.create_at] = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split('T')
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    removePic() {
      this.tempArticle.imageUrl = ''
      this.$refs.fileUrl.value = ''
      this.$refs.fileInput.value = null
    },
    async uploadFile() {
      try {
        this.isLoading = true
        const uploadedFile = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', uploadedFile)
        const res = await this.$store.dispatch('Products/upLoadFile', formData)
        this.$refs.fileUrl.value = res.data.imageUrl
        this.tempArticle.imageUrl = res.data.imageUrl
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    },
    commit() {
      this.$emit('update-article', {
        article: this.tempArticle,
        isNew: this.isNew
      })
    }
  }
}
</script>

<style lang="scss">
.ck-editor__editable_inline {
  min-height: 300px;
}

.ck-content .table {
  width: auto;
}

.ck.ck-content ul,
.ck.ck-content ul li {
  list-style-type: inherit;
}

.ck.ck-content ul,
.ck.ck-content ol {
  /* Default user agent stylesheet, you can change it to your needs. */
  padding-left: 40px !important;
}
</style>
