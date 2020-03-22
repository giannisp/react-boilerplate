/**
 * @file Navigation component.
 */

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const menu = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
];

const useStyles = makeStyles({ indicator: { backgroundColor: 'white' } });

function Navigation() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  function onTabChange(event, value) {
    history.push(value);
  }

  return (
    <AppBar position="static">
      <Tabs
        value={location.pathname}
        onChange={onTabChange}
        classes={{ indicator: classes.indicator }}
        aria-label="Menu"
      >
        {menu.map(item => (
          <Tab key={item.url} label={item.title} value={item.url} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default Navigation;
