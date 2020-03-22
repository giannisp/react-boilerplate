/**
 * @file App component.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { CssBaseline, Grid } from '@material-ui/core';

import Navigation from './Navigation';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <Helmet titleTemplate="%s - React Boilerplate" />
      <ThemeProvider theme={theme}>
        <Navigation />

        <Grid container>
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </ThemeProvider>
    </Router>
  );
}

export default App;
