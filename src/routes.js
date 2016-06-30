import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './pages/Home';
import CraftingComponents from './pages/CraftingComponents';
import NotFound from './pages/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="components" component={CraftingComponents}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
