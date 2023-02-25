import { Route, Switch } from "react-router-dom";
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Summary from "./views/Summary";

const App = () => {
  return (
    <div className="Router">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/summary/:id' render={routeProps => <Summary {...routeProps} />} />
      </Switch>
    </div>
  );
}

export default App;
