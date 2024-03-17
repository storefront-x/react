import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic React application', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', '@storefront-x/react'],
    },
    async ({ url }) => {
      await page.goto(url)
      await expect(page.getByText('Click me: 0!')).toBeDefined()
    },
  )
})

test('SSR of basic React application', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', '@storefront-x/react'],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      await expect(await response.text()).toContain('<button>Click me: <!-- -->0<!-- -->!</button>')
    },
  )
})

test('reactivity of basic React application', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', '@storefront-x/react'],
    },
    async ({ url }) => {
      await page.goto(url)
      await page.getByText('Click me: 0!').click()
      await expect(page.getByText('Click me: 1!')).toBeDefined()
    },
  )
})
