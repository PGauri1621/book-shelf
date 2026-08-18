<script setup lang="ts">
import type { Book } from '~/types/book'

defineProps<{
  book: Book
  shortlisted?: boolean
}>()

const emit = defineEmits<{
  click: []
  toggleShortlist: []
}>()
</script>

<template>
  <article
    class="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E8E2DC] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#D9CFC7] hover:shadow-lg"
    @click="emit('click')"
  >
    <!-- Shortlist button -->
    <button
      type="button"
      class="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E2DC] bg-white text-xl shadow-sm transition hover:scale-105"
      :class="shortlisted ? 'text-[#FF5000]' : 'text-[#555]'"
      :aria-label="
        shortlisted
          ? 'Remove from shortlist'
          : 'Add to shortlist'
      "
      @click.stop="emit('toggleShortlist')"
    >
      {{ shortlisted ? '♥' : '♡' }}
    </button>

    <!-- Cover -->
    <div class="aspect-[2/3] overflow-hidden bg-[#F1ECE7]">
      <img
        v-if="book.thumbnail"
        :src="book.thumbnail"
        :alt="book.title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />

      <div
        v-else
        class="flex h-full flex-col items-center justify-center gap-2 text-[#8A817A]"
      >
        <span class="text-4xl">📖</span>
        <span class="text-xs">Cover unavailable</span>
      </div>
    </div>

    <!-- Information -->
    <div class="p-4">
      <h3
        class="line-clamp-2 min-h-[42px] text-[16px] font-semibold leading-[1.3] text-[#1F1F1F]"
      >
        {{ book.title }}
      </h3>

      <p class="mt-1 line-clamp-1 text-sm text-[#6B625B]">
        {{ book.authors?.join(', ') || 'Unknown author' }}
      </p>

      <div class="mt-4 flex items-center gap-2">
        <span
          v-if="book.publishedDate"
          class="rounded-full bg-[#FFF0E8] px-2.5 py-1 text-xs font-medium text-[#C43D00]"
        >
          {{ book.publishedDate.substring(0, 4) }}
        </span>

        <span
          v-if="book.language"
          class="rounded-full bg-[#F3F0ED] px-2.5 py-1 text-xs font-medium uppercase text-[#6B625B]"
        >
          {{ book.language }}
        </span>
      </div>
    </div>
  </article>
</template>