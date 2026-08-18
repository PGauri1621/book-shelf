<script setup lang="ts">
import type { Book } from '~/types/book'

const props = defineProps<{
  book: Book
}>()

const { addBook, removeBook, isShortlisted } = useShortlist()

const openBook = () => {
  navigateTo(`/books/${props.book.id}`)
}

const toggleShortlist = () => {
  if (isShortlisted(props.book.id)) {
    removeBook(props.book.id)
  } else {
    addBook(props.book)
  }
}
</script>

<template>
  <article
    class="relative cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    @click="openBook"
  >
    <button
      type="button"
      class="absolute right-5 top-5 z-10 rounded-full bg-white p-2 text-xl shadow-md hover:scale-110"
      :aria-label="
        isShortlisted(book.id)
          ? 'Remove from shortlist'
          : 'Add to shortlist'
      "
      @click.stop="toggleShortlist"
    >
      {{ isShortlisted(book.id) ? '♥' : '♡' }}
    </button>

    <img
      v-if="book.thumbnail"
      :src="book.thumbnail"
      :alt="book.title"
      class="mx-auto h-64 w-full object-contain"
    />

    <div class="mt-4">
      <h3 class="font-semibold text-slate-900">
        {{ book.title }}
      </h3>

      <p class="mt-1 text-sm text-slate-600">
        {{ book.authors.join(', ') || 'Unknown author' }}
      </p>

      <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
        <span
          v-if="book.publishedDate"
          class="rounded-full bg-slate-100 px-2.5 py-1"
        >
          {{ book.publishedDate.substring(0, 4) }}
        </span>

        <span
          v-if="book.language"
          class="rounded-full bg-slate-100 px-2.5 py-1 uppercase"
        >
          {{ book.language }}
        </span>
      </div>
    </div>
  </article>
</template>