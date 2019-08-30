import React from "react";
import { render } from "react-dom";
import Main from './components/Main';

import { Provider } from "react-redux"
import store from './store';

const App = () => (
  <Provider store={ store }>
    <Main />
  </Provider>
);

render( <App />, document.getElementById( 'app' ) );
