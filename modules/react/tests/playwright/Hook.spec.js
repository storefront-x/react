import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('hooks concept', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        [
          'my-module',
          {
            hooks: {
              'useCounter.ts': `
                import { useState } from 'react'

                export default function useCounter () {
                  const [state, setState] = useState(0)

                  const increment = () => {
                    setState(state + 1)
                  }

                  return [state, increment]
                }
              `,
            },
            base: {
              templates: {
                'App.tsx': `
                  import useCounter from '#ioc/hooks/useCounter'

                  export default function App() {
                    const [counter, increment] = useCounter()

                    return <button data-testid="button" onClick={increment}>{ counter }</button>
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
      await expect(page.getByTestId('button')).toHaveText('0')
      await page.getByTestId('button').click()
      await expect(page.getByTestId('button')).toHaveText('1')
    },
  )
})
