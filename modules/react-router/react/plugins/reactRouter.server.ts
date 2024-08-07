import BASE_URL from '#ioc/config/BASE_URL'
import React from 'react'
import { createMemoryRouter } from 'react-router-dom'
import { routes } from '~/.sfx/pages'

// 🫣
React.useLayoutEffect = React.useEffect

export default async (ctx: any) => {
  const router = createMemoryRouter(routes, {
    basename: BASE_URL,
  })

  await router.navigate(ctx.event.node.req.url.replace(BASE_URL, '/'))

  ctx.router = router
}
