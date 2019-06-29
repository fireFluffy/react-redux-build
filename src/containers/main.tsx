import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.PureComponent<null, null> {
  public render() {
    return (
      <Router>
        <div>
          {console.log(this)}
          <div>Type Script</div>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
