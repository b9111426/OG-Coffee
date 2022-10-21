<template>
  <div class="container mt-3">
    <div class="row row-cols-2">
      <div class="col">
        <div class="row mb-2">
          <div class="col">
            <img
              v-if="isShow"
              ref="pic1"
              class="img-fluid img-thumbnail"
              :src="product.imageUrl[0]"
              alt=""
            />
          </div>
        </div>
        <div class="row">
          <div
            v-for="(i, idx) in product.imageUrl.splice(1)"
            :key="i + idx"
            class="col-4"
            @click="changPic($event)"
          >
            <img class="subImg img-fluid img-thumbnail" :src="i" alt="" />
          </div>
        </div>
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
    },
    changPic(e) {
      let url2 = e.target.getAttribute('src')
      let url1 = this.$refs.pic1.getAttribute('src')
      e.target.setAttribute('src', url1)
      this.$refs.pic1.setAttribute('src', url2)
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
<style lang="scss" scoped>
.subImg {
  cursor: pointer;
}
</style>
