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
              <div class="mt-3">
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
                <div class="mb-3">
                  <label for="image" class="form-label fw-bold"
                    >輸入圖片網址</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempArticle.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="author" class="form-label fw-bold">作者</label>
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      v-model="tempArticle.author"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
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
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="mt-3">
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
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ tempArticle }}</pre>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
//import CK_plugin, {
//  MyCustomUploadAdapterPlugin,
//  SpecialCharactersEmoji
//} from '@/libs/CK_plugin'
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
      default: true
    }
  },
  emits: ['update-article'],
  data() {
    return {
      status: {},
      tempArticle: {
        tag: ['']
      },
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
  methods: {}
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

.ck.ck-content ol,
.ck.ck-content ol li {
  list-style: decimal;
}
</style>
