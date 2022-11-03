<template>
  <h2>後台訂單</h2>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12 d-flex align-items-center mb-2 mb-lg-0">
        <div class="bg-white p-2 rounded text-dark">
          <strong> 訂單總數: {{ orders.length }} </strong>
        </div>
        <div v-if="isLoading" class="ms-auto">
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
              <tr
                v-for="(item, key) in orders"
                :key="key"
                :class="{ 'text-secondary': !item.is_paid }"
              >
                <td><samp v-date="item.due_date"></samp></td>
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
            </tbody>
            <tbody v-if="orders.length === 0" class="text-center">
              <td colspan="6" class="fs-3 text-gray py-4">訂單列表已空</td>
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
  <DelModal
    :item="tempOrder"
    :title="title"
    ref="delModal"
    @del-item="delOrder"
  ></DelModal>
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
import _ from 'lodash'

export default {
  data() {
    return {
      tempOrder: {},
      currentPage: 1,
      isLoading: false,
      title: '訂單'
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    async getOrders(page = 1) {
      this.currentPage = page
      try {
        await this.$store.dispatch('Orders/getOrders', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        throw new Error(err)
      }
    },
    openModal(item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid: _.debounce(async function (item) {
      this.isLoading = true
      const data = {
        id: item.id,
        order: item
      }
      try {
        const res = await this.$store.dispatch('Orders/modifyOrder', data)
        this.$store.dispatch('fireToast', { res })
        this.isLoading = false
        const orderComponent = this.$refs.orderModal
        orderComponent.hideModal()
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 1000),
    delOrder: _.debounce(async function () {
      try {
        await this.$store.dispatch('Orders/deleteOrder', this.tempOrder.id)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getOrders(this.currentPage)
        this.$store.dispatch('fireToast', {
          title: '訂單已刪除',
          style: 'success'
        })
      } catch (err) {
        console.log('yes')
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500)
  },
  mounted() {
    this.getOrders()
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    orders() {
      return this.$store.getters['Orders/ordersData']
    },
    pagination() {
      return this.$store.getters['Orders/ordersPage']
    },
    paidNum() {
      return this.$store.getters['Orders/paidNum']
    }
  }
}
</script>
