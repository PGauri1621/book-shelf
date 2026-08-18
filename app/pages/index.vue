<script setup lang="ts">
import type { Book } from '~/types/book'

const searchTerm = ref('')
const books = ref<Book[]>([])
const loading = ref(false)
const error = ref('')

const {
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
const { shortlist } = useShortlist()

console.log('Shortlist:', shortlist.value)
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-12">
    <div class="mx-auto max-w-6xl">
      <header class="text-center">
        <h1 class="text-4xl font-bold text-slate-900">
          Book Shelf
        </h1>

        <p class="mt-3 text-lg text-slate-600">
          Discover your next book
        </p>
      </header>

      <SearchBar
        v-model="searchTerm"
        :loading="loading"
        @search="searchBooks"
      />

      <p
        v-if="error"
        class="mt-6 text-center text-red-600"
      >
        {{ error }}
      </p>

      <section
        v-if="books.length"
        class="mt-10"
      >
        <h2 class="mb-6 text-2xl font-semibold text-slate-900">
          Search Results
        </h2>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <p
        v-else-if="!loading && searchTerm"
        class="mt-10 text-center text-slate-600"
      >
        No books found.
      </p>
    </div>
  </main>
</template>