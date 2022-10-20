<template>
  <div class="container mt-3">
    <div class="row row-cols-2">
      <div class="col">
        <img class="img-fluid img-thumbnail" :src="product.imageUrl" alt="" />
      </div>
      <div class="col">
        <h3>{{ product.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {}
    }
  },
  methods: {
    async getProduct() {
      try {
        const { id } = this.$route.params
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
