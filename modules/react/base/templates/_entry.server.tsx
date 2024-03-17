import { renderToString } from 'react-dom/server'
import App from '~/.sfx/App'
import plugins from '~/.sfx/react/plugins.server'

export default async (ctx: any) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin.default) {
      await plugin.default(ctx)
    }
  }

  const rendered = renderToString(<App ctx={ctx} />)

  ctx.out.html = (html: string) => html.replace('<div id="app"></div>', `<div id="app">${rendered}</div>`)
}
