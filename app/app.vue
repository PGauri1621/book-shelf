<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F2] text-[#1F1F1F]">
    <header class="sticky top-0 z-50 border-b border-[#E8E2DC] bg-white/95 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-xl font-bold tracking-tight text-[#1F1F1F]"
        >
          <span class="text-2xl">📚</span>
          <span>BookShelf</span>
        </NuxtLink>

        <nav class="flex items-center gap-2 sm:gap-6">
          <NuxtLink
            to="/"
            class="relative px-2 py-2 text-sm font-medium transition"
            :class="
              isActive('/')
                ? 'text-[#FF5000]'
                : 'text-[#555] hover:text-[#1F1F1F]'
            "
          >
            Discover

            <span
              v-if="isActive('/')"
              class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#FF5000]"
            />
          </NuxtLink>

          <NuxtLink
            to="/shortlist"
            class="relative flex items-center gap-1.5 px-2 py-2 text-sm font-medium transition"
            :class="
              isActive('/shortlist')
                ? 'text-[#FF5000]'
                : 'text-[#555] hover:text-[#1F1F1F]'
            "
          >
            <span>♡</span>
            <span>My Shortlist</span>

            <span
              v-if="isActive('/shortlist')"
              class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#FF5000]"
            />
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>