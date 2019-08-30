import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Route from './Route';
import Navbar from './Navbar';

class Main extends Component {
  componentDidMount() {
  }
    
  render() {
    return (
      <Fragment>
        <Router basename="/">
          <Navbar />
          <Route />
        </Router>
      </Fragment>
    );
  }
}

export default Main
