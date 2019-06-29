// Modules
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// Components
import Home from './containers/main';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(<Home />, root);
}
