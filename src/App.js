import { Route, Switch } from "react-router-dom";
import Home from './views/Home';
import Dashboard from './views/Dashboard';

const App = () => {
  return (
    <div className="Router">
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
