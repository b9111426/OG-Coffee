<template>
  <div
    class="modal slide-in-fwd-center"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close bg-gray me-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                >
                  用戶外送資料
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  訂單細節
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  選購商品
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <table v-if="tempOrder.user?.isTogo" class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
                <p v-else class="mt-4">此訂單為內用</p>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單日期</th>
                      <td>
                        <span v-date="tempOrder.create_at"></span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <span
                          v-if="tempOrder.paid_date"
                          v-date="tempOrder.paid_date"
                        >
                        </span>
                        <span v-else>尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <strong v-if="tempOrder.is_paid" class="text-success"
                          >已付款</strong
                        >
                        <span v-else class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>
                        <span class="h6">NT$ </span>
                        <span v-num="tempOrder.total"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <table class="table">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-start"
                      v-for="item in tempOrder.products"
                      :key="item.id"
                    >
                      <th>
                        {{ item.product.title }}
                      </th>
                      <td>{{ item.qty }} / {{ item.product.unit }}</td>
                      <td class="text-end">
                        <span class="h6">NT$ </span>
                        <span v-num="item.final_total"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  v-model="tempOrder.is_paid"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  <span v-if="tempOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tempOrder: {}
    }
  },
  emits: ['update-paid'],
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = this.order
    }
  }
}
</script>
