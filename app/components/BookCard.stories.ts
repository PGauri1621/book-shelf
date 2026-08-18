import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BookCard from './BookCard.vue'

const meta = {
  title: 'Components/BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BookCard>

export default meta

type Story = StoryObj<typeof meta>

const book = {
  id: 'storybook-book',
  title: 'The Great Gatsby',
  authors: ['F. Scott Fitzgerald'],
  description: 'A classic novel set in the Jazz Age.',
  publisher: 'Scribner',
  publishedDate: '1925',
  language: 'en',
  pageCount: 180,
  categories: ['Fiction', 'Classics'],
  thumbnail:
    'https://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
}

export const Default: Story = {
  args: {
    book,
    shortlisted: false,
  },
}

export const Shortlisted: Story = {
  args: {
    book,
    shortlisted: true,
  },
}