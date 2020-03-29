/**
 * @file Navigation component.
 */

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const menuItems = [
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
        {menuItems.map((menuItem) => (
          <Tab key={menuItem.url} label={menuItem.title} value={menuItem.url} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export { menuItems };
export default Navigation;
