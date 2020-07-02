import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Home,Store, Product } from './pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/store/:id" component={Store} />
      <Route exact path="/product" component={Product} />
    </Switch>
  </Router>
)

export default Routes