<script setup lang="ts">
import type { Book } from '~/types/book'

const props = defineProps<{
  book: Book
}>()

const openBook = () => {
  navigateTo(`/books/${props.book.id}`)
}
</script>

<template>
  <article class="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md" @click="openBook">
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