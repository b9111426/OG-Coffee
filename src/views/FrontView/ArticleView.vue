<template>
  <div class="container py-5">
    <h4 class="mb-5 text-tertiary">橘子專欄</h4>
    <div class="row row-cols-4 g-2">
      <div class="col">
        <div v-for="i in articles" :key="i.id" class="articleBox bg-light p-2">
          <p>{{ i.author }}</p>
          <div class="w-100">
            <img :src="i.imageUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ articles }}</pre>
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
<style lang="scss" scoped></style>
