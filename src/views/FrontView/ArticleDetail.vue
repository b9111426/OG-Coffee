<template>
  <div class="container py-5">
    <article class="bg-light p-3 py-5 shadow-sm">
      <h2 class="mb-3">{{ article.title }}</h2>
      <div
        class="mb-3 px-3 text-start"
        v-for="(i, idx) in article.tag"
        :key="idx + 12345"
      >
        <a href="javascript:;">#{{ i }}</a>
      </div>
      <div class="text-end px-3">
        <span class="">{{ article.author }}</span>
        <span class="ps-3" v-date="article.create_at"></span>
      </div>
      <div class="ck-content text-start" ref="content"></div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {}
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getArticleDetail()
  },
  mounted() {},
  methods: {
    async getArticleDetail() {
      const { id } = this.$route.params
      const res = await this.$store.dispatch('Articles/getArticleDetail', id)
      this.article = res.data.article
      this.$refs.content.innerHTML = res.data.article.content
      this.$store.dispatch('handLoading', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
