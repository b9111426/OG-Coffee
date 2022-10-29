<template>
  <h2>文章</h2>
  <div class="container">
    <div class="row mt-4">
      <div
        class="col-12 d-flex align-items-center justify-content-between mb-2 mb-lg-0"
      >
        <div class="bg-white p-2 rounded text-dark">
          <strong> 文章總數: {{}} </strong>
        </div>
        <div v-if="isLoading" class="ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
        <button class="btn btn-primary" type="button" @click="openModal(true)">
          建立新的頁面
        </button>
      </div>
      <div class="col-12">
        <div class="card overflow-auto flex-nowrap mt-2 px-3">
          <table class="table mt-4 table-hover">
            <thead>
              <tr class="table-light">
                <th width="200">標題</th>
                <th width="200">作者</th>
                <th>描述</th>
                <th width="100">建立時間</th>
                <th width="100">是否公開</th>
                <th width="120">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in articles" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.description }}</td>
                <td>{{ $filters.date(item.create_at) }}</td>
                <td>
                  <span v-if="item.isPublic">已公開</span>
                  <span v-else>未公開</span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      type="button"
                      @click="getArticle(item.id)"
                    >
                      編輯
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      type="button"
                      @click="openDelArticleModal(item)"
                    >
                      刪除
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
    ref="delModal"
    @del-item="delArticle"
  ></DelModal>
  <Pagination
    :pages="pagination"
    @emitPages="getArticle"
    class="mt-3 pb-5"
  ></Pagination>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data() {
    return {
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1
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
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.openModal(false, res.data.article)
            this.isNew = false
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
      }
      this.$refs.articleModal.openModal()
    },
    updateArticle(item) {
      this.tempArticle = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      this.isLoading = true
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((response) => {
          this.$httpMessageState(response, status)
          articleComponent.hideModal()
          this.getArticles(this.currentPage)
        })
        .catch((err) => {
          alert(err)
          console.log(err)
        })
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delArticle() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
      this.isLoading = true
      this.$http
        .delete(url)
        .then(() => {
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getArticles(this.currentPage)
        })
        .catch((err) => {
          alert(err)
        })
    }
  },
  computed: {
    articles() {
      return this.$store.getters['Articles/articlesData']
    },
    pagination() {
      return this.$store.getters['Articles/articlesPage']
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getArticles()
  }
}
</script>
