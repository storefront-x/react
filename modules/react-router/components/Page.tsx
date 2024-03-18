import { RouterProvider } from 'react-router-dom'

export default function Page({ ctx }: any) {
  return <RouterProvider router={ctx.router} />
}
