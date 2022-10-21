<template>
  <div class="container mt-3">
    <div class="row row-cols-2">
      <div class="col">
        <img class="img-fluid img-thumbnail" src="" alt="" />
      </div>
      <div class="col">
        <h3>{{ product.title }}</h3>
        <h4 class="mb-5">{{ product.subtitle }}</h4>
        <p class="text-start mb-5">{{ product.description }}</p>
        <div v-if="isShow" class="input-group input-group-sm flex-nowrap mb-3">
          <button class="btn btn-gray" type="button" id="button-addon1">
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            type="text"
            value="1"
            class="form-control text-center"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
          <button class="btn btn-gray" type="button" id="button-addon1">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <button v-if="isShow" type="button" class="btn btn-primary btn-sm">
          加入購物車
        </button>
      </div>
    </div>
  </div>
  <pre>{{ product }}</pre>
</template>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: []
      },
      isShow: false
    }
  },
  methods: {
    async getProduct() {
      try {
        const { id } = this.$route.params
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
        this.isShow = true
        this.$store.dispatch('Products/setLoading', false)
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
