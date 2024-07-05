import { withProviders } from './providers/index'
import NavBar from 'shared/ui/navbar/NavBar'
import Router from './Router'

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Router />
    </div>
  )
}

export default withProviders(App)
