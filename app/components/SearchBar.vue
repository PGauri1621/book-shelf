<script setup lang="ts">
defineProps<{
  modelValue: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: []
}>()
</script>

<template>
  <form
    class="mx-auto flex max-w-2xl gap-3"
    @submit.prevent="emit('search')"
  >
    <input
      :value="modelValue"
      type="search"
      placeholder="Search by title or author..."
      class="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )
      "
    />

    <button
      type="submit"
      :disabled="loading"
      class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {{ loading ? 'Searching...' : 'Search' }}
    </button>
  </form>
</template>