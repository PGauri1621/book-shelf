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
  <main class="min-h-screen bg-slate-100 px-6 py-10">
    <div class="mx-auto max-w-5xl">
      <button
        class="mb-8 text-sm font-medium text-blue-600 hover:text-blue-800"
        @click="navigateTo('/')"
      >
        ← Back to Discover
      </button>

      <div
        v-if="loading"
        class="rounded-xl bg-white p-10 text-center shadow-sm"
      >
        <p class="text-slate-600">
          Loading book details...
        </p>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl bg-white p-10 text-center shadow-sm"
      >
        <p class="text-red-600">
          {{ error }}
        </p>

        <button
          class="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          @click="fetchBook"
        >
          Try Again
        </button>
      </div>

      <article
        v-else-if="book"
        class="rounded-2xl bg-white p-6 shadow-sm md:p-10"
      >
        <div class="grid gap-10 md:grid-cols-[280px_1fr]">
          <div>
            <img
              v-if="book.thumbnail"
              :src="book.thumbnail"
              :alt="book.title"
              class="mx-auto max-h-[420px] w-full object-contain"
            />

            <div
              v-else
              class="flex h-[400px] items-center justify-center rounded-lg bg-slate-200 text-slate-500"
            >
              No cover available
            </div>
          </div>

          <div>
            <h1 class="text-3xl font-bold text-slate-900">
              {{ book.title }}
            </h1>

            <p class="mt-3 text-lg text-slate-600">
              {{ book.authors.join(', ') || 'Unknown author' }}
            </p>

            <button
                type="button"
                class="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                @click="toggleShortlist"
                >
                {{ isShortlisted(book.id)
                    ? '♥ Remove from shortlist'
                    : '♡ Add to shortlist' }}
            </button>

            <div class="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div v-if="book.publisher">
                <span class="font-semibold text-slate-900">
                  Publisher:
                </span>
                {{ book.publisher }}
              </div>

              <div v-if="book.publishedDate">
                <span class="font-semibold text-slate-900">
                  Published:
                </span>
                {{ book.publishedDate }}
              </div>

              <div v-if="book.pageCount">
                <span class="font-semibold text-slate-900">
                  Pages:
                </span>
                {{ book.pageCount }}
              </div>

              <div v-if="book.language">
                <span class="font-semibold text-slate-900">
                  Language:
                </span>
                {{ book.language.toUpperCase() }}
              </div>
            </div>

            <div
              v-if="book.categories?.length"
              class="mt-6"
            >
              <h2 class="font-semibold text-slate-900">
                Categories
              </h2>

              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="category in book.categories"
                  :key="category"
                  class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <div
              v-if="book.description"
              class="mt-8"
            >
              <h2 class="text-xl font-semibold text-slate-900">
                Description
              </h2>

              <div
                class="prose prose-slate mt-3 max-w-none text-slate-600"
                v-html="book.description"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>