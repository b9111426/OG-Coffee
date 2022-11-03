<template>
  <div class="input-group flex-nowrap">
    <button
      class="btn btn-gray"
      type="button"
      id="button-addon1"
      @click="$emit('min')"
    >
      <i class="bi bi-dash"></i>
    </button>
    <input
      type="number"
      :value="val"
      onkeydown="return event.keyCode !== 69"
      @input="pushVal($event)"
      class="form-control text-center hide-input-number-spinner"
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
    />
    <button
      class="btn btn-gray"
      type="button"
      id="button-addon1"
      @click="$emit('add')"
    >
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ['val'],
  emits: ['add', 'min', 'push-val'],
  methods: {
    pushVal(e) {
      let num = parseInt(e.target.value)
      if (num > 999) {
        num = 999
        e.target.value = 999
      }
      this.$emit('push-val', num)
    }
  }
}
</script>
<style lang="scss" scoped>
.hide-input-number-spinner {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
}
</style>
