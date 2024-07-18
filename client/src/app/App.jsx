import { withProviders } from './providers/index'

import Router from './Router'

const App = () => {
  return (
    <div className="app">
      <Router />
    </div>
  )
}

export default withProviders(App)
