<template>
  <div class="container py-3">
    <h2>文章</h2>
    <div class="row mt-4">
      <div
        class="col-12 d-flex align-items-center justify-content-between mb-2 mb-lg-0"
      >
        <div class="bg-white p-2 rounded text-dark">
          <strong> 文章總數: {{ allArticlesNum }} </strong>
        </div>
        <div v-if="isLoading" class="ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
        <button
          class="btn btn-primary"
          type="button"
          @click="openArticleModal(true)"
        >
          建立新的頁面
        </button>
      </div>
      <div class="col-12">
        <div class="card overflow-auto flex-nowrap mt-2 px-3">
          <table class="table mt-4 table-hover">
            <thead>
              <tr class="table-light">
                <th class="text-nowrap" width="200">標題</th>
                <th class="text-nowrap" width="200">作者</th>
                <th class="text-nowrap">描述</th>
                <th class="text-nowrap" width="100">建立時間</th>
                <th
                  class="text-center d-none d-lg-table-cell text-nowrap px-3"
                  width="145"
                >
                  是否公開
                </th>
                <th class="text-nowrap" width="120">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in articles" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.description }}</td>
                <td><span v-date="item.create_at"></span></td>
                <td class="d-none d-lg-table-cell">
                  <div class="ps-4">
                    <div class="form-check d-flex justify-content-start">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`articleSwitch${item.id}`"
                        v-model="item.isPublic"
                        @change="switchPublic(item.id, item.isPublic, false)"
                      />
                      <label
                        class="form-check-label ms-2"
                        :for="`articleSwitch${item.id}`"
                      >
                        <span
                          v-if="item.isPublic"
                          class="text-primary text-nowrap"
                          >公開</span
                        >
                        <span v-else class="text-gray-dark text-nowrap"
                          >未公開</span
                        >
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="openArticleModal(false, item.id)"
                    >
                      <span class="d-lg-block d-none text-nowrap">編輯</span>
                      <i class="bi bi-pencil-square d-lg-none"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="openDelArticleModal(item)"
                    >
                      <span class="d-lg-block d-none text-nowrap">刪除</span>
                      <i class="bi bi-x-lg d-lg-none"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="articles.length === 0" class="text-center">
              <td colspan="6" class="fs-3 text-gray py-4">文章列表已空</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <ArticleModal
    ref="articleModal"
    :article="tempArticle"
    :is-new="isNew"
    @update-article="updateArticle"
  ></ArticleModal>
  <DelModal
    :item="tempArticle"
    :title="title"
    ref="delModal"
    @del-item="delArticle"
  ></DelModal>
  <Pagination
    :pages="pagination"
    @emitPages="getArticles"
    class="mt-3 pb-5"
  ></Pagination>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import _ from 'lodash'

export default {
  data() {
    return {
      isLoading: false,
      isNew: false,
      tempArticle: {
        isPublic: false,
        imageUrl: '',
        create_at: 0,
        tag: ['']
      },
      currentPage: 1,
      title: '文章'
    }
  },
  components: {
    ArticleModal,
    DelModal,
    Pagination
  },
  methods: {
    async getArticles(page = 1) {
      this.currentPage = page
      try {
        await this.$store.dispatch('Articles/getArticles', page)
        this.getAllArticles()
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    async getAllArticles() {
      try {
        await this.$store.dispatch('Articles/getAllArticles')
      } catch (err) {
        throw new Error(err)
      }
    },
    async openArticleModal(isNew, id) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        try {
          const res = await this.$store.dispatch('Articles/getArticle', id)
          this.tempArticle = { ...res.data.article }
        } catch (err) {
          throw new Error(err)
        }
      }
      this.$refs.articleModal.openModal()
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    switchPublic: _.debounce(async function (id, isPublic, isNew) {
      try {
        const res = await this.$store.dispatch('Articles/getArticle', id)
        const data = res.data.article
        data.isPublic = isPublic
        this.updateArticle({ article: data, isNew })
      } catch (err) {
        throw new Error(err)
      }
    }, 300),
    updateArticle: _.debounce(async function ({ article, isNew }) {
      this.isLoading = true
      const articleModal = this.$refs.articleModal
      try {
        let res = null
        if (!isNew) {
          const data = { id: article.id, article }
          res = await this.$store.dispatch('Articles/modifyArticle', data)
        } else {
          res = await this.$store.dispatch('Articles/addArticle', article)
        }
        articleModal.hideModal()
        this.$store.dispatch('fireToast', { res })
        this.getArticles(this.currentPage)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500),
    delArticle: _.debounce(async function (title) {
      try {
        this.isLoading = true
        await this.$store.dispatch(
          'Articles/deleteArticle',
          this.tempArticle.id
        )
        const delModal = this.$refs.delModal
        delModal.hideModal()
        this.getArticles(this.currentPage)
        this.isLoading = false
        this.$store.dispatch('fireToast', {
          title: `${title}文章已刪除`,
          style: 'success'
        })
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500)
  },
  computed: {
    articles() {
      return this.$store.getters['Articles/articlesData']
    },
    pagination() {
      return this.$store.getters['Articles/articlesPage']
    },
    allArticlesNum() {
      return this.$store.getters['Articles/allArticlesNum']
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getArticles()
  }
}
</script>
