export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Book ID is required',
    })
  }

  const config = useRuntimeConfig()

  return await $fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`,
    {
      params: {
        key: config.googleBooksApiKey,
      },
    }
  )
})