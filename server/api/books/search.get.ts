export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const searchTerm = query.q

  if (!searchTerm || typeof searchTerm !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query is required',
    })
  }

  const config = useRuntimeConfig()

  return await $fetch('https://www.googleapis.com/books/v1/volumes', {
    params: {
      q: searchTerm,
      key: config.googleBooksApiKey,
    },
  })
})