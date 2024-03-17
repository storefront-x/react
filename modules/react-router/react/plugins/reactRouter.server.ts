import React from 'react'
import { createMemoryRouter } from 'react-router-dom'
import { routes } from '~/.sfx/pages'

// 🫣
React.useLayoutEffect = React.useEffect

export default async (ctx: any) => {
  const router = createMemoryRouter(routes)

  await router.navigate(ctx.event.node.req.url)

  ctx.router = router
}
