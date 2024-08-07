import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('index page', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              'index.tsx': `
                export default function Index() {
                  return <h1 data-testid="h1">Hello pages!</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/web')
      expect(await response.text()).toContain('Hello pages!')
      await expect(page.getByTestId('h1')).toHaveText('Hello pages!')
    },
  )
})

test('navigation', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              'index.tsx': `
                import useNavigate from '#ioc/hooks/router/useNavigate'
                export default function Index() {
                  const navigate = useNavigate()
                  return <button onClick={() => navigate('/test')}>Click me!</button>
                }
              `,
              'test.tsx': `
                export default function Test() {
                  return <h1>Hello pages!</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/web')
      await page.locator('button').click()
      await expect(page.locator('h1')).toHaveText('Hello pages!')
    },
  )
})
