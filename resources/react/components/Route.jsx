import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

//pages
import * as Pages from '../pages';

class RouterComponent extends Component {    
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Pages.Home} />
        <Route exact path="/aboutus" component={Pages.About} />
        <Redirect to="/" />
      </Switch>
    ); 
  }
}


export default RouterComponent;
