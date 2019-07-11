// @flow
import { hot } from 'react-hot-loader';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends PureComponent<null, null> {
  render() {
    return (
      <Router>
        <div>Flow the best</div>
      </Router>
    );
  }
}

export default hot(module)(App);
