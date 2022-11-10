<template>
  <div class="container py-5">
    <h4 class="mb-5 text-tertiary">橘子專欄</h4>
    <div class="row row-cols-lg-4 row-cols-1 g-2">
      <div class="col">
        <div
          v-for="i in articles"
          :key="i.id"
          class="articleBox bg-light p-2 shadow"
        >
          <img
            class="article-pic w-100 mb-2 border border-gray"
            v-src="i.imageUrl"
            alt=""
          />
          <h5 class="my-3 text-tertiary">{{ i.title }}</h5>
          <div class="px-3 mb-3">
            <div class="text-start mb-2">
              <a href="javascript:;" v-for="(x, idx) in i.tag" :key="idx + 2345"
                >#{{ x }}</a
              >
            </div>

            <p class="text-start d-flex justify-content-between mb-2">
              <span v-date="i.create_at"></span>
              <span>{{ i.author }}</span>
            </p>

            <div class="text-start">
              <a href="javascript:;" @click="toNewRouter(i.id)">更多...</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getArticles()
  },
  methods: {
    async getArticles(page = 1) {
      this.currentPage = page
      try {
        await this.$store.dispatch('Articles/frontGetArticle', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    toNewRouter(id) {
      this.$router.push({ path: `article/${id}` })
    }
  },
  computed: {
    articles() {
      return this.$store.getters['Articles/articlesData']
    },
    pagination() {
      return this.$store.getters['Articles/articlesPage']
    }
  }
}
</script>
<style lang="scss" scoped>
.article-pic {
  object-fit: cover;
  object-position: center;
}
</style>
