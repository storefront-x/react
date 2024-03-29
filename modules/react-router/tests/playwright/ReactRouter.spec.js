import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('index page', async ({ page }) => {
  await makeProject(
    {
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
      const response = await page.goto(url)
      expect(await response.text()).toContain('Hello pages!')
      await expect(page.getByTestId('h1')).toHaveText('Hello pages!')
    },
  )
})

test('custom page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              'test.tsx': `
                export default function Index() {
                  return <h1 data-testid="h1">TEST</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/test')
      expect(await response.text()).toContain('TEST')
      await expect(page.getByTestId('h1')).toHaveText('TEST')
    },
  )
})

test('404 page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              '$404.tsx': `
                export default function Index() {
                  return <h1 data-testid="h1">Not found</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/nonsense')
      expect(await response.text()).toContain('Not found')
      await expect(page.getByTestId('h1')).toHaveText('Not found')
    },
  )
})

test('basic navigatiom', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              'a.tsx': `
                import Link from '#ioc/components/router/Link'

                export default function A() {
                  return <Link to="/b">To b</Link>
                }
              `,
              'b.tsx': `
                export default function B() {
                  return <h1 data-testid="h1">Hello B</h1>
                }
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a')
      await page.getByText('To b').click()
      await expect(page.getByTestId('h1')).toHaveText('Hello B')
    },
  )
})

test('nested page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              a: {
                b: {
                  'c.tsx': `
                    export default function Index() {
                      return <h1 data-testid="h1">TEST</h1>
                    }
                  `,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/a/b/c')
      expect(await response.text()).toContain('TEST')
      await expect(page.getByTestId('h1')).toHaveText('TEST')
    },
  )
})

test('page params', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/react',
        '@storefront-x/react-router',
        [
          'my-module',
          {
            pages: {
              hello: {
                '[name].tsx': `
                  import useParams from '#ioc/hooks/router/useParams'

                  export default function Index() {
                    const { name } = useParams()

                    return <h1 data-testid="h1">{\`Hello \${name}!\`}</h1>
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/hello/world')
      expect(await response.text()).toContain('Hello world!</h1>')
      await expect(page.getByTestId('h1')).toHaveText('Hello world!')
    },
  )
})
