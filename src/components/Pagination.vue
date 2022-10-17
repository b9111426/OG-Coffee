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
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + '452'"
      >
        <a
          class="page-link rounded-circle"
          href="#"
          @click.prevent="updatePage(page)"
          >{{ page }}</a
        >
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
