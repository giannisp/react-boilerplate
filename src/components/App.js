/**
 * @file App component.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './Navigation';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
