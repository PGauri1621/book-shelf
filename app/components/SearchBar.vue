<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: []
}>()

const handleSubmit = () => {
  if (!props.modelValue.trim() || props.loading) {
    return
  }

  emit('search')
}
</script>

<template>
  <form
    class="flex w-full flex-col gap-3 sm:flex-row"
    @submit.prevent="handleSubmit"
  >
    <div class="relative flex-1">
      <span
        class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#8A817A]"
      >
        🔍
      </span>

      <input
        :value="modelValue"
        type="search"
        placeholder="Search by title or author..."
        class="h-14 w-full rounded-xl border border-[#DED6CF] bg-white pl-12 pr-4 text-base text-[#1F1F1F] outline-none transition placeholder:text-[#9A918A] focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).value,
          )
        "
      />
    </div>

    <button
      type="submit"
      :disabled="loading || !modelValue.trim()"
      class="h-14 rounded-xl bg-[#FF5000] px-7 font-semibold text-white transition hover:bg-[#E64600] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {{ loading ? 'Searching...' : 'Search' }}
    </button>
  </form>
</template>