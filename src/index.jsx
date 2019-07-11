// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import initStore from './application/redux/store';
import App from './application/containers/App';

const MOUNT_NODE = document.getElementById('root');
const store = initStore();

if (MOUNT_NODE) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    MOUNT_NODE
  );
}
