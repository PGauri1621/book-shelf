import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const vue = await import('@vitejs/plugin-vue')

    return mergeConfig(config, {
      plugins: [
        vue.default(),
      ],
    })
  },
}

export default config