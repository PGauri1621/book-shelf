<script setup lang="ts">
import type { Book } from '~/types/book'

const searchTerm = ref(typeof route.query.q === 'string' ? route.query.q : '',)
const books = ref<Book[]>([])
const loading = ref(false)
const error = ref('')
const route = useRoute()

const {
  shortlist,
  addBook,
  removeBook,
  isShortlisted,
} = useShortlist()

const toggleShortlist = (book: Book) => {
  if (isShortlisted(book.id)) {
    removeBook(book.id)
  } else {
    addBook(book)
  }
}



const searchBooks = async () => {
  if (!searchTerm.value.trim()) {
    return
  }

  loading.value = true
  error.value = ''
 

  try {
    const response = await $fetch<{
      items?: Array<{
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
          }
        }
      }>
    }>('/api/books/search', {
      params: {
        q: searchTerm.value,
      },
    })

    books.value = (response.items ?? []).map((item) => ({
      id: item.id,
      title: item.volumeInfo.title ?? 'Unknown title',
      authors: item.volumeInfo.authors ?? [],
      description: item.volumeInfo.description,
      publisher: item.volumeInfo.publisher,
      publishedDate: item.volumeInfo.publishedDate,
      language: item.volumeInfo.language,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    }))
  } catch {
    error.value = 'Unable to search for books. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-[#E8E2DC] bg-[#FAF7F2]">
      <div class="mx-auto max-w-4xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-20">
        <span
          class="inline-flex rounded-full bg-[#FFF0E8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#C43D00]"
        >
          Book discovery
        </span>

        <h1
          class="mt-5 text-4xl font-bold tracking-tight text-[#1F1F1F] sm:text-5xl"
        >
          Discover your next read
        </h1>

        <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6B625B] sm:text-lg">
          Search thousands of books by title or author and build your personal
          reading list.
        </p>

        <div class="mx-auto mt-8 max-w-2xl">
          <SearchBar
            v-model="searchTerm"
            :loading="loading"
            @search="searchBooks"
          />
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div
        v-if="books.length"
        class="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p class="text-sm font-medium text-[#FF5000]">
            Search results
          </p>

          <h2 class="mt-1 text-2xl font-bold text-[#1F1F1F]">
            Books you might enjoy
          </h2>
        </div>

        <p class="text-sm text-[#6B625B]">
          {{ books.length }} {{ books.length === 1 ? 'book' : 'books' }} found
        </p>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="flex min-h-[240px] items-center justify-center"
      >
        <div class="text-center">
          <div
            class="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#FFE0D2] border-t-[#FF5000]"
          />
          <p class="mt-4 text-sm text-[#6B625B]">
            Finding books...
          </p>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
      >
        <p class="font-semibold text-red-800">
          We couldn't complete the search.
        </p>

        <p class="mt-1 text-sm text-red-700">
          {{ error }}
        </p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!books.length"
        class="rounded-2xl border border-dashed border-[#D9CFC7] bg-white px-6 py-16 text-center"
      >
        <div class="text-5xl">📚</div>

        <h2 class="mt-5 text-xl font-semibold text-[#1F1F1F]">
          Start exploring
        </h2>

        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B625B]">
          Search for a book title or author above to discover your next read.
        </p>
      </div>

      <!-- Books -->
      <div
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
      >
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          :shortlisted="isShortlisted(book.id)"
          @click="navigateTo(`/books/${book.id}`)"
          @toggle-shortlist="toggleShortlist(book)"
        />
      </div>
    </section>
  </div>
</template>