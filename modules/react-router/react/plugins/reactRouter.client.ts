import { createBrowserRouter } from 'react-router-dom'
import { routes } from '~/.sfx/pages'

export default async (ctx: any) => {
  const router = createBrowserRouter(routes)

  await router.navigate(window.location.pathname)

  ctx.router = router
}
