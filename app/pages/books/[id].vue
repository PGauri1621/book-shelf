<script setup lang="ts">
import type { Book } from '~/types/book'

const route = useRoute()

const loading = ref(true)
const error = ref('')
const book = ref<Book | null>(null)

const { addBook, removeBook, isShortlisted } = useShortlist()

const toggleShortlist = () => {
  if (!book.value) {
    return
  }

  if (isShortlisted(book.value.id)) {
    removeBook(book.value.id)
  } else {
    addBook(book.value)
  }
}
const fetchBook = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await $fetch<{
      id: string
      volumeInfo: {
        title?: string
        authors?: string[]
        description?: string
        publisher?: string
        publishedDate?: string
        language?: string
        pageCount?: number
        categories?: string[]
        imageLinks?: {
          thumbnail?: string
          medium?: string
          large?: string
        }
      }
    }>(`/api/books/${route.params.id}`)

    book.value = {
      id: response.id,
      title: response.volumeInfo.title ?? 'Unknown title',
      authors: response.volumeInfo.authors ?? [],
      description: response.volumeInfo.description,
      publisher: response.volumeInfo.publisher,
      publishedDate: response.volumeInfo.publishedDate,
      language: response.volumeInfo.language,
      pageCount: response.volumeInfo.pageCount,
      categories: response.volumeInfo.categories,
      thumbnail:
        response.volumeInfo.imageLinks?.large ??
        response.volumeInfo.imageLinks?.medium ??
        response.volumeInfo.imageLinks?.thumbnail,
    }
  } catch {
    error.value = 'Unable to load this book. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBook)
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-sm font-medium text-[#6B625B] transition hover:text-[#FF5000]"
    >
      ← Back to Discover
    </NuxtLink>

    <div
      v-if="book"
      class="mt-8 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14"
    >
      <!-- Cover -->
      <div>
        <div class="overflow-hidden rounded-2xl bg-[#F1ECE7] shadow-sm">
          <img
            v-if="book.thumbnail"
            :src="book.thumbnail"
            :alt="book.title"
            class="aspect-[2/3] w-full object-cover"
          />

          <div
            v-else
            class="flex aspect-[2/3] flex-col items-center justify-center gap-2 text-[#8A817A]"
          >
            <span class="text-5xl">📖</span>
            <span class="text-sm">Cover unavailable</span>
          </div>
        </div>
      </div>

      <!-- Information -->
      <div>
        <div class="flex flex-wrap gap-2">
          <span
            v-if="book.language"
            class="rounded-full bg-[#FFF0E8] px-3 py-1 text-xs font-semibold uppercase text-[#C43D00]"
          >
            {{ book.language }}
          </span>

          <span
            v-if="book.publishedDate"
            class="rounded-full bg-[#F3F0ED] px-3 py-1 text-xs font-medium text-[#6B625B]"
          >
            {{ book.publishedDate.substring(0, 4) }}
          </span>
        </div>

        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-[#1F1F1F] sm:text-4xl"
        >
          {{ book.title }}
        </h1>

        <p class="mt-2 text-lg text-[#6B625B]">
          {{ book.authors?.join(', ') || 'Unknown author' }}
        </p>

        <!-- Shortlist -->
        <button
          type="button"
          class="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition"
          :class="
            isShortlisted(book.id)
              ? 'bg-[#FFF0E8] text-[#C43D00] hover:bg-[#FFE5D8]'
              : 'bg-[#FF5000] text-white hover:bg-[#E64600]'
          "
          @click="toggleShortlist(book)"
        >
          <span class="text-lg">
            {{ isShortlisted(book.id) ? '♥' : '♡' }}
          </span>

          {{
            isShortlisted(book.id)
              ? 'Remove from shortlist'
              : 'Add to shortlist'
          }}
        </button>

        <!-- Metadata -->
        <div
          class="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-[#E8E2DC] py-7 sm:grid-cols-3"
        >
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-[#8A817A]">
              Publisher
            </p>
            <p class="mt-1 text-sm font-medium text-[#1F1F1F]">
              {{ book.publisher || 'Unknown' }}
            </p>
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-[#8A817A]">
              Pages
            </p>
            <p class="mt-1 text-sm font-medium text-[#1F1F1F]">
              {{ book.pageCount || 'Unknown' }}
            </p>
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-[#8A817A]">
              Published
            </p>
            <p class="mt-1 text-sm font-medium text-[#1F1F1F]">
              {{ book.publishedDate || 'Unknown' }}
            </p>
          </div>
        </div>

        <!-- Description -->
        <section class="mt-9">
          <h2 class="text-xl font-bold text-[#1F1F1F]">
            About this book
          </h2>

          <div
            v-if="book.description"
            class="prose prose-sm mt-4 max-w-none leading-7 text-[#5F5751]"
            v-html="book.description"
          />

          <p
            v-else
            class="mt-4 text-sm text-[#8A817A]"
          >
            No description is available for this book.
          </p>
        </section>

        <!-- Categories -->
        <section
          v-if="book.categories?.length"
          class="mt-8"
        >
          <h2 class="text-sm font-semibold uppercase tracking-wide text-[#8A817A]">
            Categories
          </h2>

          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="category in book.categories"
              :key="category"
              class="rounded-full border border-[#E8E2DC] bg-white px-3 py-1.5 text-sm text-[#6B625B]"
            >
              {{ category }}
            </span>
          </div>
        </section>
      </div>
    </div>

    <div
      v-else
      class="py-20 text-center"
    >
      <p class="text-[#6B625B]">
        Book not found.
      </p>
    </div>
  </div>
</template>