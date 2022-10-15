<template>
  <div
    class="toast-container position-fixed pe-3 pt-3 top-0 end-0"
    style="z-index: 1500"
    ref="toast"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show slide-in-blurred-right"
      :class="`toast${key}`"
      role="alert"
    >
      <div class="toast-header">
        <i
          v-if="msg.style === 'success'"
          :class="`text-${msg.style}`"
          class="bi bi-check-square-fill fs-3 me-2"
        ></i>
        <i
          v-else
          :class="`text-${msg.style}`"
          class="bi bi-exclamation-square-fill fs-3 me-2"
        ></i>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data() {
    return {
      messages: []
    }
  },
  methods: {
    toastAutoClear() {
      setTimeout(() => {
        this.messages.shift()
      }, 4000)
    },
    clearToast(index) {
      this.messages.splice(index, 1)
    }
  },
  mounted() {
    emitter.on('push-message', (message) => {
      // 接收資料
      const { style, title, content } = message
      this.messages.push({ style, title, content })
      this.toastAutoClear()
    })
  }
}
</script>
