<template>
  <h2>後台訂單</h2>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12 d-flex">
        <div class="ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
      </div>
      <div class="col-12">
        <div class="card overflow-auto flex-nowrap mt-2 px-3">
          <table class="table mt-4 table-hover">
            <thead>
              <tr class="table-light">
                <th class="text-nowrap">購買時間</th>
                <th class="text-nowrap">Email</th>
                <th class="text-nowrap">購買款項</th>
                <th class="text-nowrap">應付金額</th>
                <th class="text-nowrap d-none d-lg-table-cell">是否付款</th>
                <th class="text-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, key) in orders" :key="key">
                <tr
                  v-if="orders.length"
                  :class="{ 'text-secondary': !item.is_paid }"
                >
                  <td>{{ $filters.date(item.create_at) }}</td>
                  <td>
                    <span v-text="item.user.email" v-if="item.user"></span>
                  </td>
                  <td>
                    <ul class="list-unstyled">
                      <li
                        class="text-nowrap"
                        v-for="(product, i) in item.products"
                        :key="i"
                      >
                        {{ product.product.title }} 數量：{{ product.qty }}
                        {{ product.product.unit }}
                      </li>
                    </ul>
                  </td>
                  <td class="text-right">{{ item.total }}</td>
                  <td class="d-none d-lg-table-cell">
                    <div class="d-flex justify-content-center">
                      <div class="form-check">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          :id="`paidSwitch${item.id}`"
                          v-model="item.is_paid"
                          @change="updatePaid(item)"
                        />
                        <label
                          class="form-check-label"
                          :for="`paidSwitch${item.id}`"
                        >
                          <span
                            v-if="item.is_paid"
                            class="text-primary text-nowrap"
                            >已付款</span
                          >
                          <span v-else class="text-gray-dark text-nowrap"
                            >未付款</span
                          >
                        </label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-primary btn-sm"
                        type="button"
                        @click="openModal(item)"
                      >
                        <span class="d-lg-block d-none text-nowrap">編輯</span>
                        <i class="bi bi-pencil-square d-lg-none"></i>
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        @click="openDelOrderModal(item)"
                      >
                        <span class="d-lg-block d-none text-nowrap">刪除</span>
                        <i class="bi bi-x-lg d-lg-none"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <OrderModal
    :order="tempOrder"
    ref="orderModal"
    @update-paid="updatePaid"
  ></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination
    :pages="pagination"
    @emitPages="getOrders"
    class="mt-3 pb-5"
  ></Pagination>
</template>
<script>
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http
        .get(url, this.tempProduct)
        .then((response) => {
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.$store.dispatch('handLoading', false)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid(item) {
      this.emitter.emit('loading')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http
        .put(api, { data: paid })
        .then((res) => {
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
          this.$httpMessageState(res, res.data.message)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.emitter.emit('loading')
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getOrders(this.currentPage)
          this.$httpMessageState(res, '刪除')
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    }
  },
  mounted() {
    this.emitter.emit('loading')
    this.getOrders()
  },
  created() {
    this.$store.dispatch('handLoading', true)
  }
}
</script>
