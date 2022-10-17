<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center align-items-center">
      <li>
        <button
          type="button"
          class="btn text-primary bg-transparent border-0"
          :disabled="!pages.has_pre"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <i
            class="bi bi-chevron-double-left fs-5"
            :class="{ 'text-white': !pages.has_pre }"
          ></i>
        </button>
      </li>
      <li
        class="page-item mx-1"
        :class="{ active: i === pages.current_page }"
        v-for="i in pages.total_pages"
        :key="i + '452'"
      >
        <a
          class="page-link rounded-circle"
          href="#"
          @click.prevent="updatePage(i)"
          >{{ i }}</a
        >
      </li>
      <li v-if="!pages.current_page" class="page-item disabled mx-1">
        <a href="#" class="bg-gray text-white page-link rounded-circle">1</a>
      </li>
      <li>
        <button
          type="button"
          class="btn text-primary bg-transparent border-0"
          :disabled="!pages.has_next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <i
            class="bi bi-chevron-double-right fs-5"
            :class="{ 'text-white': !pages.has_next }"
          ></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emitPages', page)
    }
  }
}
</script>
