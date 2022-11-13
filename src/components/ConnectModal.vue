<template>
  <div class="modal scale-in-center" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered text-start modal-lg">
      <div class="modal-content">
        <v-form @submit="onSubmit" v-slot="{ errors }" ref="form">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-white">聯絡我們</h5>
            <button
              type="button"
              class="btn-close bg-gray me-1"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              謝謝您的主動聯絡，請留下要諮詢的問題，我們會用以下資訊進行回覆。
            </p>

            <v-field
              type="email"
              name="email"
              placeholder="請輸入您的電子信箱"
              class="form-control my-3"
              rules="email|required"
              id="exampleInputEmail1"
              :class="{ 'is-invalid': errors['email'] }"
            ></v-field>
            <error-message name="email" class="invalid-feedback">
            </error-message>
            <v-field
              class="form-control my-3"
              name="訊息欄"
              as="textarea"
              placeholder="請輸入您的訊息"
              rules="required"
              id="exampleFormControlTextarea1"
              :class="{ 'is-invalid': errors['訊息欄'] }"
              rows="3"
            ></v-field>
            <error-message name="訊息欄" class="invalid-feedback">
            </error-message>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary px-5">發送</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  mixins: [modalMixin],
  methods: {
    onSubmit() {
      this.$refs.form.resetForm()
      this.hideModal()
      this.$store.dispatch('fireToast', {
        title: '訊息已送出',
        style: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::placeholder {
  opacity: 0.5; /* Firefox */
}
</style>
