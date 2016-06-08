import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import ComponentsPage from './components/ComponentsPage';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="components" component={ComponentsPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
