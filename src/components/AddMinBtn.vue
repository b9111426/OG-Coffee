<template>
  <button
    class="btn btn-gray"
    type="button"
    id="button-addon1"
    @click="$emit('min')"
  >
    <i class="bi bi-dash"></i>
  </button>
  <input
    type="text"
    :value="val"
    oninput="value=value.replace(/[^\d]/g,'')"
    @input="$emit('update:val', $event.target.value)"
    class="form-control text-center"
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
</template>

<script>
export default {
  props: { val: Number },
  emits: ['add', 'min', 'update:val']
}
</script>
