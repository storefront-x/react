import { GeneratingConcept } from '@storefront-x/core'

export default class ReactPlugins extends GeneratingConcept {
  get directory() {
    return 'react/plugins'
  }

  get exportAll() {
    return true
  }

  get supportsClientServer() {
    return true
  }
}
