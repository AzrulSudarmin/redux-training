import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

import Route from './Route';
import Navbar from './Navbar';

class Main extends Component {
  componentDidMount() {
    return this.props.actions.getProfile();
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

export default connect(
  state => ({}),
  dispatch => ({ actions: bindActionCreators(actions, dispatch)})
)(Main)
