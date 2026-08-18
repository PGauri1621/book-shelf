<script setup lang="ts">
const { shortlist } = useShortlist()
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-10">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 flex items-center justify-between">
        <button
          type="button"
          class="text-sm font-medium text-blue-600 hover:text-blue-800"
          @click="navigateTo('/')"
        >
          ← Discover Books
        </button>

        <h1 class="text-3xl font-bold text-slate-900">
          My Shortlist
        </h1>
      </div>

      <div
        v-if="!shortlist.length"
        class="rounded-xl bg-white p-12 text-center shadow-sm"
      >
        <div class="text-5xl">
          ♡
        </div>

        <h2 class="mt-4 text-xl font-semibold text-slate-900">
          Your shortlist is empty
        </h2>

        <p class="mt-2 text-slate-600">
          Search for books and save the ones you'd like to read.
        </p>

        <button
          type="button"
          class="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          @click="navigateTo('/')"
        >
          Discover Books
        </button>
      </div>

      <div
        v-else
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <BookCard
          v-for="book in shortlist"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </main>
</template>