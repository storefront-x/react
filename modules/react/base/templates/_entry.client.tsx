import { hydrateRoot } from 'react-dom/client'
import App from '~/.sfx/App'
import plugins from '~/.sfx/react/plugins.client'

const main = async () => {
  const ctx = {}

  for (const plugin of Object.values(plugins) as any) {
    if (plugin.default) {
      await plugin.default(ctx)
    }
  }

  hydrateRoot(document.getElementById('app')!, <App ctx={ctx} />)
}

main()
