import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './pages/HomePage';
import ComponentsPage from './pages/ComponentsPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="components" component={ComponentsPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
