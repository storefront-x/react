import { RouterProvider } from 'react-router-dom'
import { App } from '~/.sfx/pages'

export default function Page({ ctx }: any) {
  return (
    <App>
      <RouterProvider router={ctx.router} />
    </App>
  )
}
