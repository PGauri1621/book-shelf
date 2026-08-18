import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SearchBar from './SearchBar.vue'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '',
    loading: false,
  },
}

export const WithSearchText: Story = {
  args: {
    modelValue: 'Harry Potter',
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    modelValue: 'Harry Potter',
    loading: true,
  },
}