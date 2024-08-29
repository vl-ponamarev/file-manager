import { withProviders } from './providers/index';
import Router from './Router';

const App = () => {
  return <Router />;
};

export default withProviders(App);
