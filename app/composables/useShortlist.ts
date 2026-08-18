import type { Book } from '~/types/book'

export const useShortlist = () => {
  const shortlist = useCookie<Book[]>('book-shortlist', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365,
    watch: true,
  })

  const addBook = (book: Book) => {
    if (shortlist.value.some((item) => item.id === book.id)) {
      return
    }

    shortlist.value = [...shortlist.value, book]
  }

  const removeBook = (bookId: string) => {
    shortlist.value = shortlist.value.filter(
      (book) => book.id !== bookId
    )
  }

  const isShortlisted = (bookId: string) => {
    return shortlist.value.some(
      (book) => book.id === bookId
    )
  }

  return {
    shortlist,
    addBook,
    removeBook,
    isShortlisted,
  }
}