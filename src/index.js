/**
 * @file Main entrypoint.
 */

import ReactDOM from 'react-dom';

import App from './components/App';

const rootEl = document.getElementById('root');
ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
