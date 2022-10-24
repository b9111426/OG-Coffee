<template>
  <div class="container">
    <h2 class="my-5">購物車</h2>
    <div v-if="isLoading">
      <img class="loading02" src="@/assets/images/load02.gif" alt="" />
    </div>

    <div class="card overflow-auto flex-nowrap px-3">
      <table class="table mt-4 table-hover">
        <thead>
          <tr class="table-light">
            <th class="text-nowrap">商品資料</th>
            <th class="text-center text-nowrap px-5">優惠</th>
            <th width="160" class="text-center text-nowrap">單件價格</th>
            <th width="220" class="text-center">數量</th>
            <th width="160" class="text-center text-nowrap">小計</th>
            <th width="80" class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in cartData" :key="i.id" class="align-middle">
            <td class="text-start">
              <img
                class="pre-pic img-thumbnail"
                :src="i.product.imageUrl[0]"
                alt="縮圖"
              />
              <div class="d-inline-block ms-1">
                <p>{{ i.product.title }}</p>
                <p>{{ i.product.category }}</p>
              </div>
            </td>
            <td>優惠</td>
            <td class="text-center text-nowrap">
              <p v-price="i.product.price"></p>
            </td>
            <td class="text-center text-nowrap">
              <AddMinBtn
                :val="i.qty"
                @add="modify(i.id, i.product_id, i.qty, 'add')"
                @min="modify(i.id, i.product_id, i.qty, 'min')"
                @push-val="pushVal"
              ></AddMinBtn>
            </td>
            <td class="text-center text-nowrap">
              <p v-price="i.final_total"></p>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(i.product.title, i.id)"
              >
                <i class="bi bi-x"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-show="cartData.length === 0" class="text-center">
          <td colspan="7" class="fs-3 text-gray-dark py-4">
            購物車已空
            <div id="emptyCart" ref="emptyCart"></div>
          </td>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 刪除產品 -->
  <DelModal
    :item="tempProduct"
    ref="delModal"
    @del-item="delCartProduct"
  ></DelModal>
</template>

<script>
import _ from 'lodash'
import DelModal from '@/components/DelModal.vue'
import AddMinBtn from '@/components/AddMinBtn.vue'
export default {
  data() {
    return {
      isLoadingItem: '',
      tempProduct: {},
      qty: 1,
      isLoading: false
    }
  },
  components: {
    DelModal,
    AddMinBtn
  },
  methods: {
    modify: _.debounce(async function (id, p_id, qty, str) {
      this.isLoading = true
      str === 'add' ? qty++ : qty--
      if (qty <= 1) {
        qty = 1
      }
      const obj = {
        id,
        data: {
          product_id: p_id,
          qty
        }
      }
      try {
        await this.$store.dispatch('Cart/modifyCart', obj)
        await this.$store.dispatch('Cart/getCart')
        this.isLoading = false
      } catch (err) {
        throw new Error(err)
      }
    }, 500),
    pushVal(val) {
      this.qty = val
    },
    openDelModal(title, id) {
      this.tempProduct.title = title
      this.tempProduct.id = id
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    async getCart() {
      try {
        await this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    delCartProduct: _.debounce(async function (title) {
      try {
        await this.$store.dispatch('Cart/deleteCart', this.tempProduct.id)

        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$store.dispatch('fireToast', {
          title: `${title}已刪除`,
          style: 'success'
        })
        this.getCart()
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500),
    createLottie() {
      const anLottie = this.lottie.loadAnimation({
        container: this.$refs.emptyCart,
        animType: 'svg',
        loop: true,
        path: 'https://lottie.host/d6b9ff64-e007-4565-999e-ce83c26d82f9/LueoasihD3.json'
      })
      anLottie.setSpeed(1)
    }
  },
  mounted() {
    this.createLottie()
  },
  created() {
    this.getCart()
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    cartData() {
      const cartData = this.$store.getters['Cart/getCart']
      return cartData
    }
  }
}
</script>
<style lang="scss" scoped>
#emptyCart {
  height: 300px;
}
.pre-pic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
}
</style>
