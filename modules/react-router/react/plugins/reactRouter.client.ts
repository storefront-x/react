import BASE_URL from '#ioc/config/BASE_URL'
import { createBrowserRouter } from 'react-router-dom'
import { routes } from '~/.sfx/pages'

export default async (ctx: any) => {
  const router = createBrowserRouter(routes, {
    basename: BASE_URL,
  })

  await router.navigate(window.location.pathname.replace(BASE_URL, '/'))

  ctx.router = router
}
