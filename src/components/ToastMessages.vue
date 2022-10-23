<template>
  <div
    class="toast-container position-fixed pe-3 pt-3 top-0 end-0"
    style="z-index: 1600"
  >
    <div
      v-for="(i, idx) in messages"
      :key="i.id"
      class="toast show slide-left"
      role="alert"
    >
      <div class="toast-header">
        <i
          v-if="i.style === 'success'"
          :class="`text-${i.style}`"
          class="bi bi-check-square-fill fs-3 me-2"
        ></i>
        <i
          v-else
          :class="`text-${i.style}`"
          class="bi bi-exclamation-square-fill fs-3 me-2"
        ></i>
        <strong class="me-auto">{{ i.title }}</strong>
        <button
          type="button"
          class="btn-close bg-gray p-2 me-2"
          @click="clearToast(idx)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body bg-gray" v-if="i.content">
        {{ i.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearToast(idx) {
      this.$store.dispatch('spliceToast', idx)
    }
  },
  computed: {
    messages() {
      return this.$store.getters.toastState
    }
  }
}
</script>
