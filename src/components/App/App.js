/**
 * @file App component.
 */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { CssBaseline, Grid } from '@material-ui/core';

import Navigation from '../Navigation';
import About from '../../pages/About';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <Helmet titleTemplate="%s - React Boilerplate" />
          <Navigation />

          <Grid container>
            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </HelmetProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
