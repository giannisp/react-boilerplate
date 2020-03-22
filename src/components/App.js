/**
 * @file App component.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { CssBaseline, Grid } from '@material-ui/core';

import Navigation from './Navigation';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Helmet titleTemplate="%s - React Boilerplate" />
      <Navigation />

      <Grid xs={12}>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
