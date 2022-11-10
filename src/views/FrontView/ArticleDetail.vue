<template>
  <div class="container py-5">
    <div>這是文章內頁</div>
    <article class="bg-light p-3 py-5 w-100" ref="content"></article>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('handLoading', true)
    this.getArticleDetail()
  },
  methods: {
    async getArticleDetail() {
      const { id } = this.$route.params
      const res = await this.$store.dispatch('Articles/getArticleDetail', id)
      console.log(res.data.article.content)
      this.$refs.content.innerHTML = res.data.article.content
      this.$store.dispatch('handLoading', false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
