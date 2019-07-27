// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import initStore from './application/redux/store';
import App from './application/containers/App';

const MOUNT_NODE = document.getElementById('root');

if (MOUNT_NODE) {
  const store = initStore();
  const history = createBrowserHistory();

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    MOUNT_NODE
  );
}
