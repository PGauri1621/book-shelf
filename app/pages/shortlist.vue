<script setup lang="ts">
//const { shortlist } = useShortlist()
const {
  shortlist,
  removeBook,
} = useShortlist()
</script>

<template>
  <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8">
    <div class="mb-10">
      <p class="text-sm font-medium text-[#FF5000]">
        Your collection
      </p>

      <h1 class="mt-2 text-3xl font-bold tracking-tight text-[#1F1F1F] sm:text-4xl">
        My Shortlist
      </h1>

      <p class="mt-2 text-[#6B625B]">
        Books you've saved for later.
      </p>
    </div>

    <!-- Empty -->
    <div
      v-if="!shortlist.length"
      class="rounded-2xl border border-dashed border-[#D9CFC7] bg-white px-6 py-20 text-center"
    >
      <div class="text-5xl">♡</div>

      <h2 class="mt-5 text-xl font-semibold text-[#1F1F1F]">
        Your shortlist is empty
      </h2>

      <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B625B]">
        Save books you want to come back to and they'll appear here.
      </p>

      <NuxtLink
        to="/"
        class="mt-6 inline-flex items-center rounded-xl bg-[#FF5000] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E64600]"
      >
        Discover books
      </NuxtLink>
    </div>

    <!-- Books -->
    <div v-else>
      <div class="mb-6 flex items-center justify-between">
        <p class="text-sm font-medium text-[#6B625B]">
          {{ shortlist.length }}
          {{ shortlist.length === 1 ? 'book' : 'books' }} saved
        </p>
      </div>

      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
      >
        <BookCard
          v-for="book in shortlist"
          :key="book.id"
          :book="book"
          :shortlisted="true"
          @click="navigateTo(`/books/${book.id}`)"
          @toggle-shortlist="removeBook(book.id)"
        />
      </div>
    </div>
  </div>
</template>