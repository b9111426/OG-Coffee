<template>
  <div class="modal scale-in-center" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-success text-white text-center">
          <h5 class="modal-title">訂單已送出，商品結帳</h5>
        </div>
        <div class="modal-body">
          <div v-if="!isPaid">
            <table class="table">
              <thead>
                <tr>
                  <th
                    width="55"
                    class="bg-transparent d-none d-lg-table-cell"
                  ></th>
                  <th class="bg-transparent text-start text-lg-center">
                    產品名稱
                  </th>
                  <th class="bg-transparent">數量</th>
                  <th width="100" class="bg-transparent">價錢</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, idx) in cartData" :key="i.id">
                  <td class="d-none d-lg-table-cell">{{ idx + 1 }}</td>
                  <td class="text-start text-lg-center">
                    {{ i.product.title }}
                  </td>
                  <td>{{ i.qty }}({{ i.product.unit }})</td>
                  <td>NT$ {{ i.total }}</td>
                </tr>
              </tbody>
            </table>
            <h5 class="text-end pe-2">總計: NT$ {{ userData.finalPrice }}</h5>
          </div>
          <div v-else>
            <h4>付款完成</h4>
            <img
              class="checked p-2 scale-in-center"
              src="@/assets/images/checked.svg"
              alt=""
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" @click="checkOut">
            結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import _ from 'lodash'
export default {
  mixins: [modalMixin],
  props: {
    cartData: Array,
    userData: Object,
    orderId: String
  },
  data() {
    return {
      isPaid: false
    }
  },
  methods: {
    checkOut: _.debounce(async function () {
      try {
        const res = await this.$store.dispatch('Orders/payOrder', this.orderId)
        if (res.data.success) {
          this.isPaid = true
          setTimeout(() => {
            this.hideModal()
            this.$router.push('/cart')
          }, 1500)
        }
      } catch (err) {
        throw new Error(err)
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.checked {
  width: 150px;
  height: 150px;
}
</style>
