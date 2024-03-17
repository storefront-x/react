import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('components concept', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        [
          'my-module',
          {
            components: {
              'Hello.tsx': `
                export default function Hello() {
                  return <h1>Hello from component</h1>
                }
              `,
            },
            base: {
              templates: {
                'App.tsx': `
                  import Hello from '#ioc/components/Hello'

                  export default function App() {
                    return <Hello />
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url)
      await expect(page.getByText('Hello from component')).toBeDefined()
    },
  )
})
