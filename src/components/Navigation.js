/**
 * @file Navigation component.
 */

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';

const menu = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
];

function Navigation() {
  const location = useLocation();
  const history = useHistory();

  function onTabChange(event, value) {
    history.push(value);
  }

  return (
    <AppBar position="static">
      <Tabs value={location.pathname} onChange={onTabChange} aria-label="Menu">
        {menu.map(item => (
          <Tab label={item.title} value={item.url} />
        ))}
      </Tabs>
    </AppBar>
  );
}

export default Navigation;
