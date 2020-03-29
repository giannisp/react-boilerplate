/**
 * @file Home page.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div>
      <Helmet title="Home" />

      <p>Hello World!</p>
    </div>
  );
}

export default Home;
