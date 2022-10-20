<template>
  <div class="container mt-3">
    <div class="row row-cols-2">
      <div class="col">
        <img ref="pic" class="img-fluid" :src="product.imageUrl" alt="" />
      </div>
      <div class="col">
        <h3>{{ product.title }}</h3>
        <h4 class="mb-5">{{ product.subtitle }}</h4>
        <p class="text-start">{{ product.description }}</p>
        <div v-if="isShow" class="input-group input-group-sm flex-nowrap mt-2">
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
        <button v-if="isShow" type="button" class="btn btn-primary btn-sm mt-2">
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
      product: {},
      isShow: false
    }
  },
  methods: {
    async getProduct() {
      try {
        const { id } = this.$route.params
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
        this.$refs.pic.classList.add('img-thumbnail')
        this.isShow = true
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
