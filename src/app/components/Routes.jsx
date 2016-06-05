import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import ComponentsPage from '../pages/components';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="components" component={ComponentsPage} />
  </Route>
);
